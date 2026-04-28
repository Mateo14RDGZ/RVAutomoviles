const MIAUTO_BASE = "https://www.miauto.com.uy";

function buildTargetUrl(pathParts: string[], search: string): string {
  const path = pathParts.length > 0 ? `/${pathParts.join("/")}` : "/";
  return `${MIAUTO_BASE}${path}${search}`;
}

function passthroughHeaders(source: Headers): Headers {
  const headers = new Headers();
  source.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (
      lower === "x-frame-options" ||
      lower === "content-security-policy" ||
      lower === "content-length" ||
      lower === "content-encoding" ||
      lower === "transfer-encoding"
    ) {
      return;
    }
    headers.set(key, value);
  });
  return headers;
}

function rewriteHtml(html: string): string {
  return html
    .replace(/(href|src|action|content)=("|')\/(?!\/)/g, '$1=$2/miauto/')
    .replace(/url\(\s*("|')?\/(?!\/)/g, "url($1/miauto/");
}

async function proxyRequest(req: Request, params: { path?: string[] }) {
  const targetUrl = buildTargetUrl(params.path ?? [], new URL(req.url).search);
  const upstream = await fetch(targetUrl, {
    method: req.method,
    headers: {
      "user-agent": req.headers.get("user-agent") ?? "Mozilla/5.0",
      accept: req.headers.get("accept") ?? "*/*",
      "accept-language": req.headers.get("accept-language") ?? "es-ES,es;q=0.9",
      cookie: req.headers.get("cookie") ?? "",
      referer: MIAUTO_BASE,
    },
    body: req.method === "GET" || req.method === "HEAD" ? undefined : await req.arrayBuffer(),
    redirect: "follow",
    cache: "no-store",
  });

  const headers = passthroughHeaders(upstream.headers);
  headers.set("x-robots-tag", "noindex, nofollow");

  const contentType = upstream.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    const html = await upstream.text();
    return new Response(rewriteHtml(html), {
      status: upstream.status,
      headers,
    });
  }

  const body = await upstream.arrayBuffer();
  return new Response(body, {
    status: upstream.status,
    headers,
  });
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxyRequest(req, await params);
}

export async function POST(req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxyRequest(req, await params);
}
