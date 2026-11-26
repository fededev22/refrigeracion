"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AcFallback } from "@/components/AcFallback";
import { ExampleTag } from "@/components/ExampleTag";
import { MagneticButton } from "@/components/MagneticButton";
import { useAppState } from "@/components/Providers";
import { allowHeavy3d } from "@/lib/capabilities";
import { contact, defaultWhatsappText, site, whatsappHref } from "@/lib/config";
import { scrollToId } from "@/lib/scroll";

const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => <AcFallback />,
});

const Snowfield = dynamic(() => import("@/components/Snowfield"), {
  ssr: false,
});

const headline = "Servicio técnico de aire y refrigeración";

export function Hero() {
  const { temp } = useAppState();
  const visual = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<"flat" | "3d">("flat");

  useEffect(() => {
    if (!allowHeavy3d()) return;
    const frame = window.requestAnimationFrame(() => setMode("3d"));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const node = visual.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    node.textContent = "";
    const id = window.setInterval(() => {
      index += 1;
      node.textContent = headline.slice(0, index);
      if (index >= headline.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header id="inicio" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-16">
      {mode === "3d" ? <Snowfield /> : null}
      <div className="mx-auto grid w-full min-w-0 max-w-6xl items-center gap-10 px-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="relative z-10 min-w-0 max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
            {site.shortName}
          </p>
          <h1 className="mt-3 max-w-full font-display text-[2.15rem] leading-[1.05] font-semibold tracking-tight text-balance text-ink sm:text-6xl">
            <span className="sr-only">{headline}</span>
            <span ref={visual} aria-hidden="true">{headline}</span>
            <span aria-hidden="true" className="type-caret" />
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Instalación, reparación y venta de equipos. Calificación {site.rating.toString().replace(".", ",")} en Google, con {site.reviewCount} opiniones.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            <ExampleTag /> Teléfono, zonas, horarios, marcas, años y reseñas de esta demo no son reales.
          </p>
          <div className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <MagneticButton
              href={whatsappHref(defaultWhatsappText)}
              ariaLabel="Pedir presupuesto por WhatsApp. El número es de ejemplo."
            >
              Pedí tu presupuesto por WhatsApp
            </MagneticButton>
            <button type="button" className="btn-ghost" onClick={() => scrollToId("servicios")}>
              Ver servicios
            </button>
          </div>
          <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-muted">Google</dt>
              <dd className="font-display text-2xl font-semibold text-ink">
                {site.rating.toString().replace(".", ",")}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Opiniones</dt>
              <dd className="font-display text-2xl font-semibold text-ink">{site.reviewCount}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-muted">
                Experiencia <ExampleTag />
              </dt>
              <dd className="font-display text-2xl font-semibold text-ink">{contact.yearsLabel}</dd>
            </div>
          </dl>
        </div>

        <div className="relative z-10 h-[340px] sm:h-[420px] lg:h-[520px]">
          <p className="temp-badge" aria-hidden="true">
            {temp}°
          </p>
          {mode === "3d" ? <Hero3D /> : <AcFallback />}
        </div>
      </div>
    </header>
  );
}
