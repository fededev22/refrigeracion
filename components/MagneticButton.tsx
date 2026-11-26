"use client";

import { useRef } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function MagneticButton({ href, children, className = "", ariaLabel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  function move(event: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
  }

  function leave() {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`btn-hot pulse-hot inline-flex min-h-12 w-full max-w-full items-center justify-center rounded-full bg-accent px-5 text-center text-base font-semibold whitespace-normal text-white sm:w-auto ${className}`}
    >
      {children}
    </a>
  );
}
