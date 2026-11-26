"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExampleTag } from "@/components/ExampleTag";
import { testimonials } from "@/lib/config";

export function Reviews() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  function step(direction: number) {
    setIndex((value) => (value + direction + testimonials.length) % testimonials.length);
  }

  return (
    <section id="resenas" className="section" aria-labelledby="resenas-titulo" aria-roledescription="carrusel">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="kicker">Voces</p>
            <h2 id="resenas-titulo" className="section-title">Tres historias de muestra</h2>
            <p className="section-lead">No salen de Google. Están para mostrar el formato.</p>
            <div className="mt-3">
              <ExampleTag />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-ghost" onClick={() => step(-1)} aria-label="Reseña anterior">
              Anterior
            </button>
            <button type="button" className="btn-ghost" onClick={() => step(1)} aria-label="Reseña siguiente">
              Siguiente
            </button>
          </div>
        </div>

        <div
          className="relative mx-auto mt-10 h-[320px] max-w-3xl [perspective:1200px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            {testimonials.map((item, itemIndex) => {
              const offset = itemIndex - index;
              const wrapped = offset > 1 ? offset - testimonials.length : offset < -1 ? offset + testimonials.length : offset;
              if (Math.abs(wrapped) > 1) return null;
              return (
                <motion.article
                  key={item.id}
                  className="glass absolute inset-x-0 top-0 mx-auto w-full max-w-xl rounded-[2rem] p-6 sm:p-8"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{
                    x: wrapped * 70,
                    rotateY: wrapped * -18,
                    scale: wrapped === 0 ? 1 : 0.9,
                    opacity: wrapped === 0 ? 1 : 0.55,
                    zIndex: wrapped === 0 ? 2 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  aria-hidden={wrapped !== 0}
                >
                  <ExampleTag />
                  <blockquote className="mt-4 text-xl leading-relaxed text-ink">“{item.quote}”</blockquote>
                  <p className="mt-6 font-semibold text-ink">{item.name}</p>
                  <p className="text-sm text-muted">{item.role}</p>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
