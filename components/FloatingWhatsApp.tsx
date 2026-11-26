"use client";

import { contact, defaultWhatsappText, whatsappHref } from "@/lib/config";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref(defaultWhatsappText)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-hot pulse-hot fixed right-4 bottom-4 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-accent px-4 font-semibold text-white shadow-lg"
      aria-label={`WhatsApp ${contact.phoneDisplay}. Contenido de ejemplo.`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.14h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 14.04c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.41-.14-.95-.31-1.64-.61-2.88-1.24-4.76-4.14-4.9-4.33-.14-.2-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.44.03.64.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.2-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.28.29-.12.56.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.26.14.42.12.58-.07.16-.2.67-.78.85-1.05.18-.26.36-.22.6-.13.24.08 1.54.72 1.8.86.26.13.44.2.5.31.07.12.07.67-.17 1.35Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
