"use client";

import { useRef } from "react";
import { ExampleTag } from "@/components/ExampleTag";
import { ServiceCard } from "@/components/ServiceCard";
import { brands, services } from "@/lib/config";
import { motionAllowed, useGSAP, gsap } from "@/lib/gsap";

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!motionAllowed()) return;
    gsap.from("[data-service]", {
      y: 28,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 75%" },
    });
  }, { scope: root });

  return (
    <section id="servicios" ref={root} className="section" aria-labelledby="servicios-titulo">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="kicker">Oficio</p>
          <h2 id="servicios-titulo" className="section-title">Qué hacemos</h2>
          <p className="section-lead">
            Aire acondicionado y refrigeración, de la instalación a la placa. La lista es de ejemplo y se puede cambiar desde la configuración.
          </p>
          <div className="mt-3">
            <ExampleTag />
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} data-service>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
        <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted">
          <ExampleTag />
          <span>Marcas de ejemplo, sin confirmar servicio oficial:</span>
          <span className="font-medium text-ink">{brands.join(" · ")}</span>
        </p>
      </div>
    </section>
  );
}
