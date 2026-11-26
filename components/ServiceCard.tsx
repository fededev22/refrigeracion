"use client";

import { Lottie } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useAppState } from "@/components/Providers";
import { lottieByService } from "@/lib/lottieIcons";
import { scrollToId } from "@/lib/scroll";

type Service = {
  id: string;
  title: string;
  text: string;
};

export function ServiceCard({ service }: { service: Service }) {
  const card = useRef<HTMLElement>(null);
  const { setServiceId } = useAppState();
  const reduce = useReducedMotion();
  const animation = lottieByService[service.id as keyof typeof lottieByService];

  function tilt(event: React.MouseEvent<HTMLElement>) {
    const el = card.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  }

  function reset() {
    if (card.current) card.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  }

  function choose() {
    setServiceId(service.id);
    scrollToId("presupuesto");
  }

  return (
    <div className="[perspective:900px]">
      <article
        ref={card}
        className="glass flex h-full flex-col rounded-3xl p-5 transition-transform duration-200"
        onMouseMove={tilt}
        onMouseLeave={reset}
      >
        <div className="h-16 w-16" aria-hidden="true">
          <Lottie src={animation} loop={reduce ? false : 1} autoplay={reduce !== true} className="h-16 w-16" />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.text}</p>
        <button type="button" className="btn-ghost mt-5 self-start" onClick={choose}>
          Pedir este servicio
        </button>
      </article>
    </div>
  );
}
