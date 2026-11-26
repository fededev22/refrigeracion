"use client";

import { useRef } from "react";
import { ExampleTag } from "@/components/ExampleTag";
import { contact, zones } from "@/lib/config";
import { gsap, motionAllowed, useGSAP } from "@/lib/gsap";

export function CoverageMap() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!motionAllowed()) return;
    gsap.from("[data-pin]", {
      y: -36,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "bounce.out",
      scrollTrigger: { trigger: root.current, start: "top 72%" },
    });
  }, { scope: root });

  return (
    <section id="cobertura" ref={root} className="section" aria-labelledby="cobertura-titulo">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
        <div>
          <p className="kicker">Alcance</p>
          <h2 id="cobertura-titulo" className="section-title">Dónde llegamos</h2>
          <p className="section-lead">{contact.coverage}.</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ExampleTag />
            <p className="text-sm text-muted">Mapa ilustrado. Las localidades son de ejemplo.</p>
          </div>
        </div>
        <div className="glass relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
          <svg viewBox="0 0 640 420" className="h-auto w-full" role="img" aria-label="Mapa ilustrado de zonas de ejemplo">
            <path
              d="M80 90 C140 40 250 50 310 110 C360 40 470 30 560 100 C600 180 540 250 460 270 C500 330 430 390 330 360 C250 400 140 360 120 290 C40 250 30 150 80 90Z"
              className="fill-[color:var(--ice-shape)] stroke-[color:var(--line)]"
              strokeWidth="3"
            />
            <path
              d="M70 210 C150 180 230 230 250 300 C180 360 80 340 60 280 C40 250 40 230 70 210Z"
              className="fill-[color:var(--ice-shape-2)]"
            />
          </svg>
          {zones.map((zone) => (
            <span
              key={zone.id}
              data-pin
              className="absolute -translate-x-1/2 -translate-y-full text-center"
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            >
              <span className="mx-auto block h-3 w-3 rounded-full bg-accent shadow-[0_8px_16px_rgba(194,65,12,0.45)]" />
              <span className="mt-1 block text-[11px] font-semibold text-ink">{zone.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
