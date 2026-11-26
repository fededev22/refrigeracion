"use client";

import Image from "next/image";
import { useState } from "react";
import { defaultWhatsappText, site, whatsappHref } from "@/lib/config";
import { scrollToId } from "@/lib/scroll";

const links = [
  { id: "servicios", label: "Servicios" },
  { id: "cobertura", label: "Cobertura" },
  { id: "proceso", label: "Proceso" },
  { id: "presupuesto", label: "Presupuesto" },
];

function currentTheme() {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "dark" || explicit === "light") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function Nav() {
  const [open, setOpen] = useState(false);

  function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("dc-theme", next);
  }

  function go(id: string) {
    setOpen(false);
    scrollToId(id);
  }

  return (
    <nav className="nav-bar" aria-label="Principal">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-3">
        <a href="#inicio" className="flex items-center gap-2 font-display text-sm font-semibold text-ink" onClick={(event) => { event.preventDefault(); go("inicio"); }}>
          <Image src="/marca.png" alt="" width={36} height={36} />
          <span className="hidden sm:inline">{site.shortName}</span>
        </a>
        <div className="ml-auto hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-link" onClick={(event) => { event.preventDefault(); go(link.id); }}>
              {link.label}
            </a>
          ))}
        </div>
        <button type="button" className="btn-ghost ml-auto md:ml-0" onClick={toggleTheme} aria-label="Cambiar entre modo claro y oscuro">
          <span className="when-light">Modo oscuro</span>
          <span className="when-dark">Modo claro</span>
        </button>
        <a className="btn-hot hidden min-h-11 rounded-full bg-accent px-4 text-sm font-semibold text-white sm:inline-flex sm:items-center" href={whatsappHref(defaultWhatsappText)} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <button
          type="button"
          className="btn-ghost md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((value) => !value)}
        >
          Menú
        </button>
      </div>
      {open ? (
        <div id="menu-movil" className="border-t border-line px-5 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="nav-link py-2" onClick={(event) => { event.preventDefault(); go(link.id); }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
