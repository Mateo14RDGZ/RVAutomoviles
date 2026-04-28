"use client";

const MIAUTO_SIMULATOR_URL = "https://www.miauto.com.uy/simulador/";

function centeredPopupFeatures(width: number, height: number): string {
  const dualScreenLeft = window.screenLeft ?? window.screenX ?? 0;
  const dualScreenTop = window.screenTop ?? window.screenY ?? 0;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
  const left = Math.max(0, dualScreenLeft + (viewportWidth - width) / 2);
  const top = Math.max(0, dualScreenTop + (viewportHeight - height) / 2);

  return `popup=yes,width=${width},height=${height},left=${Math.round(left)},top=${Math.round(top)},noopener,noreferrer`;
}

export function MiautoPopupButton() {
  const openSimulatorPopup = () => {
    const popup = window.open(MIAUTO_SIMULATOR_URL, "miauto-simulador", centeredPopupFeatures(1180, 860));

    // Fallback si el navegador bloquea popups.
    if (!popup) {
      window.location.href = MIAUTO_SIMULATOR_URL;
    }
  };

  return (
    <button type="button" onClick={openSimulatorPopup} className="rv-btn-primary inline-flex w-full justify-center sm:w-auto">
      Simular préstamo
    </button>
  );
}
