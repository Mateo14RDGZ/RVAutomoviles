"use client";

import { useMemo, useState } from "react";

const CURRENCY_SYMBOL: Record<string, string> = {
  UYU: "$",
  USD: "US$",
  UI: "UI",
};

const YEARLY_RATE: Record<string, number> = {
  UYU: 0.24,
  USD: 0.1,
  UI: 0.08,
};

export function MiautoSimulatorPanel() {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState<"UYU" | "USD" | "UI">("USD");
  const [months, setMonths] = useState(24);
  const [amount, setAmount] = useState(22000);

  const simulation = useMemo(() => {
    const monthlyRate = YEARLY_RATE[currency] / 12;
    const factor = Math.pow(1 + monthlyRate, months);
    const installment = amount * ((monthlyRate * factor) / (factor - 1));
    const total = installment * months;

    return {
      installment: Number.isFinite(installment) ? installment : 0,
      total: Number.isFinite(total) ? total : 0,
    };
  }, [amount, currency, months]);

  return (
    <div className="mt-7 w-full sm:max-w-3xl">
      <button type="button" onClick={() => setOpen((v) => !v)} className="rv-btn-primary w-full sm:w-auto">
        {open ? "Ocultar simulador" : "Simular préstamo"}
      </button>

      {open ? (
        <div className="mt-4 rounded-2xl border border-white/20 bg-white/95 p-4 text-slate-900 shadow-xl sm:p-5">
          <p className="text-lg font-semibold tracking-tight">Simulá tu préstamo</p>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Referencia inspirada en el simulador de MiAuto. El cálculo es estimativo y puede variar según evaluación.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="text-xs font-medium text-slate-700 sm:text-sm">
              Moneda
              <select
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-rv-accent focus:ring-2"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "UYU" | "USD" | "UI")}
              >
                <option value="UYU">UYU</option>
                <option value="USD">USD</option>
                <option value="UI">UI</option>
              </select>
            </label>

            <label className="text-xs font-medium text-slate-700 sm:text-sm">
              Cuotas
              <select
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-rv-accent focus:ring-2"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              >
                {[12, 18, 24, 30, 36].map((value) => (
                  <option key={value} value={value}>
                    {value} cuotas
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-medium text-slate-700 sm:text-sm">
              Monto del préstamo
              <input
                type="number"
                min={1000}
                step={500}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-rv-accent focus:ring-2"
                value={amount}
                onChange={(e) => setAmount(Math.max(1000, Number(e.target.value) || 0))}
              />
            </label>
          </div>

          <div className="mt-4 grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
            <p className="text-sm text-slate-700">
              Cuota estimada:{" "}
              <strong>
                {CURRENCY_SYMBOL[currency]} {simulation.installment.toLocaleString("es-UY", { maximumFractionDigits: 0 })}
              </strong>
            </p>
            <p className="text-sm text-slate-700">
              Total estimado:{" "}
              <strong>
                {CURRENCY_SYMBOL[currency]} {simulation.total.toLocaleString("es-UY", { maximumFractionDigits: 0 })}
              </strong>
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href="https://www.miauto.com.uy/simulador/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-rv-accent/40 bg-rv-accent/10 px-4 py-2 text-sm font-semibold text-rv-accent hover:bg-rv-accent/15"
            >
              Abrir simulador oficial MiAuto
            </a>
            <span className="text-xs text-slate-500">Trabajamos con Santander y con todos los bancos.</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
