"use client";

import { climateCaption } from "@/lib/config";
import { useAppState } from "@/components/Providers";

export function Thermometer() {
  const { temp, setTemp } = useAppState();
  const caption = climateCaption(temp);

  return (
    <section id="termometro" className="section" aria-labelledby="termometro-titulo">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="kicker">El juego de la página</p>
          <h2 id="termometro-titulo" className="section-title">
            Bajá o subí la temperatura
          </h2>
          <p className="section-lead">
            El termómetro cambia el clima de toda la página. Hacia abajo aparece la escarcha. Hacia arriba entra el calor.
          </p>
          <p className="mt-4 text-lg text-ink" aria-live="polite">
            {caption}
          </p>
        </div>
        <div className="glass rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <p className="font-display text-7xl leading-none font-semibold tracking-tight text-ink">
              {temp}°
            </p>
            <p className="pb-2 text-sm text-muted">Entre 16° y 32°</p>
          </div>
          <label className="mt-8 block">
            <span className="sr-only">Temperatura de la página</span>
            <input
              className="thermo"
              type="range"
              min={16}
              max={32}
              step={1}
              value={temp}
              aria-valuemin={16}
              aria-valuemax={32}
              aria-valuenow={temp}
              aria-valuetext={`${temp} grados. ${caption}`}
              onChange={(event) => setTemp(Number(event.target.value))}
            />
          </label>
          <div className="mt-3 flex justify-between text-sm font-medium text-muted">
            <span>Frío</span>
            <span>Calor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
