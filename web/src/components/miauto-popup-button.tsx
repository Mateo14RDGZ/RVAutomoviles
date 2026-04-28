"use client";

const SIMULATOR_URL = "https://www.miauto.com.uy/#simulador";

function popupFeatures(width: number, height: number): string {
  const dualScreenLeft = window.screenLeft ?? window.screenX ?? 0;
  const dualScreenTop = window.screenTop ?? window.screenY ?? 0;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
  const left = Math.max(0, dualScreenLeft + (viewportWidth - width) / 2);
  const top = Math.max(0, dualScreenTop + (viewportHeight - height) / 2);
  return [
    "popup=yes",
    "resizable=yes",
    "scrollbars=yes",
    "toolbar=no",
    "menubar=no",
    "location=no",
    "status=no",
    `width=${width}`,
    `height=${height}`,
    `left=${Math.round(left)}`,
    `top=${Math.round(top)}`,
  ].join(",");
}

export function MiautoPopupButton() {
  return (
    <button
      type="button"
      className="rv-btn-primary group inline-flex w-full items-center justify-center gap-2 sm:w-auto"
      onClick={() => {
        // Abrir primero una ventana en blanco mejora la chance de popup real (no tab).
        const popup = window.open("", "miauto-simulador", popupFeatures(1180, 860));
        if (!popup) {
          window.alert("Tu navegador bloqueó el popup. Permití popups para este sitio e intentá nuevamente.");
          return;
        }
        popup.opener = null;
        popup.location.href = SIMULATOR_URL;
        popup.focus();
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Simular préstamo
    </button>
  );
}
