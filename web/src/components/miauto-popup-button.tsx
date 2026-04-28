"use client";

const SIMULATOR_URL = "https://www.miauto.com.uy/#simulador";

function popupFeatures(width: number, height: number): string {
  const dualScreenLeft = window.screenLeft ?? window.screenX ?? 0;
  const dualScreenTop = window.screenTop ?? window.screenY ?? 0;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
  const left = Math.max(0, dualScreenLeft + (viewportWidth - width) / 2);
  const top = Math.max(0, dualScreenTop + (viewportHeight - height) / 2);
  return `popup=yes,width=${width},height=${height},left=${Math.round(left)},top=${Math.round(top)},noopener,noreferrer`;
}

export function MiautoPopupButton() {
  return (
    <a
      href={SIMULATOR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="rv-btn-primary inline-flex w-full justify-center sm:w-auto"
      onClick={(event) => {
        event.preventDefault();
        const popup = window.open(SIMULATOR_URL, "miauto-simulador", popupFeatures(1180, 860));
        if (!popup) window.open(SIMULATOR_URL, "_blank", "noopener,noreferrer");
      }}
    >
      Simular préstamo
    </a>
  );
}
