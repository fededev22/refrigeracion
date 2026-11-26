import { contact, site } from "@/lib/config";

/**
 * JSON-LD LocalBusiness / HVACBusiness.
 * rating y reviewCount son reales.
 * telephone, openingHours, address y areaServed son PLACEHOLDER.
 */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: site.name,
  description: site.category,
  url: site.url,
  image: `${site.url}/marca.png`,
  telephone: `+${contact.phoneE164}`,
  email: contact.email,
  openingHours: contact.hoursSchema,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gran Buenos Aires",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  areaServed: contact.coverage,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating,
    reviewCount: site.reviewCount,
    bestRating: site.ratingBest,
    worstRating: 1,
  },
};
