/**
 * Única fuente de textos y datos de la landing.
 * Todo lo marcado con `example: true` es PLACEHOLDER inventado.
 * Hay que reemplazarlo por datos reales antes de publicar.
 * Lo que no lleva esa marca está confirmado.
 */

export const site = {
  name: "DC REFRIGERACIÓN SERVICIO TÉCNICO",
  shortName: "DC Refrigeración",
  category:
    "Servicio técnico y venta de equipos de refrigeración y aire acondicionado",
  /** Dato real: calificación pública de Google. */
  rating: 4.8,
  /** Dato real: cantidad de opiniones en Google. */
  reviewCount: 67,
  ratingBest: 5,
  /**
   * PLACEHOLDER. Reemplazar por el dominio real (o la URL de Vercel)
   * antes de publicar. También se puede definir NEXT_PUBLIC_SITE_URL.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "es_AR",
} as const;

/** PLACEHOLDER: teléfono y WhatsApp inventados. */
export const contact = {
  example: true,
  phoneDisplay: "+54 9 11 0000-0000",
  phoneE164: "5491100000000",
  hours: "Lunes a sábado, 8 a 20 hs",
  hoursSchema: "Mo-Sa 08:00-20:00",
  coverage: "Zona Norte y Zona Oeste del Gran Buenos Aires",
  /** PLACEHOLDER: años de experiencia inventados. */
  yearsLabel: "+10 años",
  email: "hola@example.com",
} as const;

/** PLACEHOLDER: redes inventadas. Apuntan a example.com a propósito. */
export const socials = [
  { label: "Instagram", href: "https://example.com/instagram" },
  { label: "Facebook", href: "https://example.com/facebook" },
] as const;

export const services = [
  {
    id: "split",
    title: "Instalación de split",
    text: "Colocación de equipos nuevos, con la prueba de frío incluida.",
    example: true,
  },
  {
    id: "service",
    title: "Service y mantenimiento",
    text: "Limpieza, control y puesta a punto para que rinda como el primer día.",
    example: true,
  },
  {
    id: "gas",
    title: "Carga de gas",
    text: "Cuando el equipo deja de enfriar, revisamos la pérdida y cargamos.",
    example: true,
  },
  {
    id: "comercial",
    title: "Heladeras y cámaras",
    text: "Reparación de heladeras comerciales y cámaras frigoríficas.",
    example: true,
  },
  {
    id: "inverter",
    title: "Placas inverter",
    text: "Diagnóstico y reparación de placas electrónicas.",
    example: true,
  },
  {
    id: "venta",
    title: "Venta de equipos",
    text: "Asesoramiento para elegir el equipo según el ambiente.",
    example: true,
  },
] as const;

/** PLACEHOLDER: marcas de ejemplo. No implica servicio oficial. */
export const brands = ["Samsung", "LG", "Surrey", "BGH", "Carrier"] as const;

export const steps = [
  {
    id: "consulta",
    title: "Consulta",
    text: "Nos contás qué pasa, por WhatsApp o con el formulario.",
  },
  {
    id: "visita",
    title: "Visita",
    text: "Coordinamos un día y vemos el equipo en el lugar.",
  },
  {
    id: "presupuesto",
    title: "Presupuesto",
    text: "Te decimos el trabajo y el valor antes de arrancar.",
  },
  {
    id: "servicio",
    title: "Servicio",
    text: "Hacemos el trabajo y dejamos el equipo andando.",
  },
] as const;

/**
 * PLACEHOLDER: zonas inventadas dentro de la frase de cobertura,
 * también inventada. No usar como mapa real.
 */
export const zones = [
  { id: "san-isidro", name: "San Isidro", x: 62, y: 28 },
  { id: "vicente-lopez", name: "Vicente López", x: 48, y: 40 },
  { id: "tigre", name: "Tigre", x: 74, y: 16 },
  { id: "san-martin", name: "San Martín", x: 40, y: 52 },
  { id: "moron", name: "Morón", x: 28, y: 64 },
  { id: "ituzaingo", name: "Ituzaingó", x: 18, y: 74 },
  { id: "ramos", name: "Ramos Mejía", x: 34, y: 78 },
  { id: "merlo", name: "Merlo", x: 14, y: 58 },
] as const;

/**
 * PLACEHOLDER: reseñas ficticias. No vienen de Google.
 * Los nombres son personajes inventados.
 */
export const testimonials = [
  {
    id: "lucia",
    name: "Lucía Pereyra",
    role: "Cliente de ejemplo",
    quote:
      "Vinieron el mismo día que se quedó el split. En dos horas estaba soplando frío de nuevo.",
    example: true,
  },
  {
    id: "hector",
    name: "Héctor Molina",
    role: "Comercio de ejemplo",
    quote:
      "Les dejé la cámara de la fiambrería y la dejaron andando antes del finde.",
    example: true,
  },
  {
    id: "nora",
    name: "Nora Acosta",
    role: "Cliente de ejemplo",
    quote:
      "Me explicaron el presupuesto sin apurarme. El mantenimiento quedó anotado para el otro mes.",
    example: true,
  },
] as const;

export function climateCaption(temp: number) {
  if (temp <= 18) return "Modo heladera. Mirá la escarcha en los bordes.";
  if (temp <= 22) return "Aire fresco, justo para quedarse.";
  if (temp <= 26) return "Templado. Ni frío ni calor.";
  if (temp <= 29) return "Se viene el verano.";
  return "Está para prender el split.";
}

export function whatsappHref(text: string) {
  return `https://wa.me/${contact.phoneE164}?text=${encodeURIComponent(text)}`;
}

export const defaultWhatsappText =
  "Hola, quiero un presupuesto de servicio técnico de refrigeración.";
