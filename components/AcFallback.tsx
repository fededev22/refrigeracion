"use client";

import { useAppState } from "@/components/Providers";

/** Equipo dibujado en CSS para celular, reduced-motion y equipos modestos. */
export function AcFallback() {
  const { temp } = useAppState();

  return (
    <div className="ac-stage" aria-hidden="true">
      <div className="ac-snow">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="ac-body">
        <span className="ac-led" />
        <span className="ac-screen">{temp}°</span>
        <span className="ac-vent" />
        <span className="ac-flap" />
      </div>
      <span className="ac-wave ac-wave-a" />
      <span className="ac-wave ac-wave-b" />
    </div>
  );
}
