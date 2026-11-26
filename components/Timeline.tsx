"use client";

import { useRef } from "react";
import { steps } from "@/lib/config";
import { gsap, motionAllowed, useGSAP } from "@/lib/gsap";

export function Timeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!motionAllowed()) return;
    gsap.fromTo(
      "[data-line]",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.4,
        },
      },
    );
    gsap.from("[data-step]", {
      opacity: 0,
      y: 20,
      stagger: 0.12,
      scrollTrigger: { trigger: root.current, start: "top 72%" },
    });
  }, { scope: root });

  return (
    <section id="proceso" ref={root} className="section" aria-labelledby="proceso-titulo">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="kicker">De la consulta al arreglo</p>
          <h2 id="proceso-titulo" className="section-title">Cómo trabajamos</h2>
          <p className="section-lead">Cuatro pasos, sin letra chica en el medio.</p>
        </div>
        <div className="relative mt-12 max-w-2xl">
          <span data-line className="absolute top-2 bottom-2 left-[11px] w-[3px] origin-top rounded-full bg-cyan" aria-hidden="true" />
          <ol className="space-y-8 pl-10">
            {steps.map((step, index) => (
              <li key={step.id} data-step className="relative">
                <span className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
