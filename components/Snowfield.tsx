"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 30,
  pauseOnBlur: true,
  detectRetina: true,
  particles: {
    number: { value: 32 },
    color: { value: ["#ffffff", "#b9ecf8", "#7fd3ea"] },
    opacity: { value: { min: 0.25, max: 0.7 } },
    size: { value: { min: 1, max: 3.2 } },
    move: {
      enable: true,
      direction: "bottom",
      speed: 0.8,
      outModes: { default: "out" },
    },
    shape: { type: "circle" },
  },
};

export default function Snowfield() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles
        id="hero-snow"
        options={options}
        className="snow-layer pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />
    </ParticlesProvider>
  );
}
