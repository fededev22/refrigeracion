"use client";

import { useRef } from "react";
import { site } from "@/lib/config";
import { gsap, motionAllowed, useGSAP } from "@/lib/gsap";

export function TrustCounter() {
  const root = useRef<HTMLElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const rating = site.rating.toString().replace(".", ",");

  useGSAP(() => {
    if (!motionAllowed()) {
      root.current?.classList.add("is-in");
      return;
    }
    const counter = { value: 0 };
    gsap.fromTo(counter, { value: 0 }, {
      value: site.reviewCount,
      duration: 1.4,
      ease: "power1.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: root.current,
        start: "top 78%",
        once: true,
      },
      onStart: () => root.current?.classList.add("is-in"),
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.value));
      },
    });
  }, { scope: root });

  return (
    <section ref={root} className="section" aria-labelledby="confianza-titulo">
      <div className="mx-auto max-w-6xl px-5">
        <div className="glass rounded-[2rem] px-6 py-10 sm:px-12">
          <p className="kicker">Dato real de Google</p>
          <h2 id="confianza-titulo" className="section-title">
            {rating} de {site.ratingBest}
          </h2>
          <div className="mt-4 flex gap-2" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="star" style={{ ["--fill" as string]: index < 4 ? "1" : "0.8" }}>
                <span className="star-base">★</span>
                <span className="star-fill">★</span>
              </span>
            ))}
          </div>
          <p className="mt-4 text-lg text-muted">
            <span ref={count} className="font-display text-4xl font-semibold text-ink">
              {site.reviewCount}
            </span>{" "}
            opiniones publicadas.
          </p>
        </div>
      </div>
    </section>
  );
}
