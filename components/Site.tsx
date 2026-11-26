"use client";

import { CoverageMap } from "@/components/CoverageMap";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { AppStateProvider } from "@/components/Providers";
import { QuoteForm } from "@/components/QuoteForm";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SnowCursor } from "@/components/SnowCursor";
import { Thermometer } from "@/components/Thermometer";
import { Timeline } from "@/components/Timeline";
import { TrustCounter } from "@/components/TrustCounter";

export function Site() {
  return (
    <AppStateProvider>
      <SmoothScroll />
      <Loader />
      <SnowCursor />
      <div className="climate-hot" aria-hidden="true" />
      <div className="frost-frame" aria-hidden="true" />
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Nav />
      <main id="contenido">
        <Hero />
        <Thermometer />
        <Services />
        <TrustCounter />
        <CoverageMap />
        <Timeline />
        <QuoteForm />
        <Reviews />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </AppStateProvider>
  );
}
