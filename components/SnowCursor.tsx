"use client";

import { useEffect, useRef } from "react";
import { allowCursorTrail } from "@/lib/capabilities";

type Flake = { x: number; y: number; r: number; vy: number; life: number };

export function SnowCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!allowCursorTrail()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const flakes: Flake[] = [];
    let frame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
    resize();

    function onMove(event: MouseEvent) {
      flakes.push({
        x: event.clientX * dpr,
        y: event.clientY * dpr,
        r: (1.6 + Math.random() * 2.4) * dpr,
        vy: (0.35 + Math.random() * 0.6) * dpr,
        life: 1,
      });
      if (flakes.length > 28) flakes.shift();
    }

    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = flakes.length - 1; i >= 0; i -= 1) {
        const flake = flakes[i];
        flake.y += flake.vy;
        flake.life -= 0.02;
        if (flake.life <= 0) {
          flakes.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = flake.life;
        ctx.fillStyle = "#f4fbff";
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = window.requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="snow-cursor" aria-hidden="true" />;
}
