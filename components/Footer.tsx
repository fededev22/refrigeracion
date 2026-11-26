import Image from "next/image";
import { ExampleTag } from "@/components/ExampleTag";
import { contact, site, socials } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/marca.png" alt="Marca de DC Refrigeración" width={56} height={56} />
          <p className="mt-3 font-display text-lg font-semibold text-ink">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.category}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Contacto</h2>
          <p className="mt-3 text-sm text-ink">
            <ExampleTag />
          </p>
          <a className="mt-2 block text-ink underline decoration-cyan underline-offset-4" href={`tel:+${contact.phoneE164}`}>
            {contact.phoneDisplay}
          </a>
          <p className="mt-2 text-sm text-muted">{contact.hours}</p>
          <p className="mt-2 text-sm text-muted">{contact.coverage}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Redes</h2>
          <p className="mt-3"><ExampleTag /></p>
          <ul className="mt-2 space-y-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a className="text-ink underline decoration-cyan underline-offset-4" href={social.href}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Google</h2>
          <p className="mt-3 font-display text-3xl font-semibold text-ink">
            {site.rating.toString().replace(".", ",")}
          </p>
          <p className="text-sm text-muted">{site.reviewCount} opiniones. Este dato es real.</p>
        </div>
      </div>
      <p className="px-5 pb-8 text-center text-xs text-muted">
        Demo de presentación. Reemplazá el contenido de ejemplo antes de publicarla.
      </p>
    </footer>
  );
}
