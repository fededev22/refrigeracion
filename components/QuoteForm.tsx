"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ExampleTag } from "@/components/ExampleTag";
import { useAppState } from "@/components/Providers";
import { contact, services, whatsappHref, zones } from "@/lib/config";

const schema = z.object({
  name: z.string().trim().min(2, "Escribí tu nombre"),
  service: z.string().min(1, "Elegí un servicio"),
  zone: z.string().min(1, "Elegí una zona"),
  message: z.string().trim().min(8, "Contanos un poco más, aunque sea una frase"),
  day: z.string().min(1, "Elegí un día"),
});

type FormValues = z.infer<typeof schema>;

type DayOption = { value: string; label: string };

function upcomingDays(): DayOption[] {
  const days: DayOption[] = [];
  const cursor = new Date();
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  });
  const label = new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  });
  const iso = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  while (days.length < 8) {
    if (weekday.format(cursor) !== "Sun") {
      days.push({ value: iso.format(cursor), label: label.format(cursor) });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function QuoteForm() {
  const { serviceId } = useAppState();
  const [days, setDays] = useState<DayOption[]>([]);
  const [sent, setSent] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      service: services[0].id,
      zone: "",
      message: "",
      day: "",
    },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setDays(upcomingDays()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setValue("service", serviceId);
  }, [serviceId, setValue]);

  function onSubmit(values: FormValues) {
    const service = services.find((item) => item.id === values.service)?.title ?? values.service;
    const zone = zones.find((item) => item.id === values.zone)?.name ?? values.zone;
    const text = [
      `Hola, soy ${values.name}.`,
      `Quiero un presupuesto de ${service} en ${zone}.`,
      `Día tentativo: ${values.day}.`,
      values.message,
    ].join(" ");
    const anchor = document.createElement("a");
    anchor.href = whatsappHref(text);
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.click();
    setSent(true);
  }

  return (
    <section id="presupuesto" className="section" aria-labelledby="presupuesto-titulo">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="kicker">Turnos y presupuestos</p>
          <h2 id="presupuesto-titulo" className="section-title">Dejanos los datos y seguimos por WhatsApp</h2>
          <p className="section-lead">
            El formulario no guarda nada en un servidor: arma el mensaje y abre el chat.
          </p>
          <div className="mt-3">
            <ExampleTag />
            <span className="ml-2 text-sm text-muted">El número {contact.phoneDisplay} es de ejemplo.</span>
          </div>
        </div>

        <form className="glass mt-8 grid gap-6 rounded-[2rem] p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px]" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-4">
            <label className="grid gap-1 text-sm font-medium text-ink">
              Nombre
              <input className="field" autoComplete="name" {...register("name")} />
              {errors.name ? <span className="text-accent">{errors.name.message}</span> : null}
            </label>
            <label className="grid gap-1 text-sm font-medium text-ink">
              Tipo de servicio
              <select className="field" {...register("service")}>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>{service.title}</option>
                ))}
              </select>
              {errors.service ? <span className="text-accent">{errors.service.message}</span> : null}
            </label>
            <label className="grid gap-1 text-sm font-medium text-ink">
              Zona
              <select className="field" {...register("zone")}>
                <option value="" disabled>Elegí una zona de ejemplo</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
              {errors.zone ? <span className="text-accent">{errors.zone.message}</span> : null}
            </label>
            <label className="grid gap-1 text-sm font-medium text-ink">
              Mensaje
              <textarea className="field min-h-28 resize-y" {...register("message")} />
              {errors.message ? <span className="text-accent">{errors.message.message}</span> : null}
            </label>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-ink">Día tentativo</legend>
            <p className="mt-1 text-xs text-muted">Lunes a sábado. Horario de ejemplo: {contact.hours}.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {days.length === 0
                ? Array.from({ length: 4 }, (_, index) => (
                    <span key={index} className="h-11 rounded-2xl bg-white/40" />
                  ))
                : days.map((day) => (
                    <button
                      key={day.value}
                      type="button"
                      className={selectedDay === day.value ? "day day-on" : "day"}
                      aria-pressed={selectedDay === day.value}
                      onClick={() => {
                        setSelectedDay(day.value);
                        setValue("day", day.value, { shouldValidate: true });
                      }}
                    >
                      {day.label}
                    </button>
                  ))}
            </div>
            <input type="hidden" {...register("day")} />
            {errors.day ? <span className="mt-2 block text-sm text-accent">{errors.day.message}</span> : null}
            <button type="submit" className="btn-hot pulse-hot mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-4 font-semibold text-white">
              Abrir WhatsApp
            </button>
            {sent ? <p className="mt-3 text-sm text-muted" role="status">Si el chat no se abrió, revisá que el navegador permita ventanas nuevas.</p> : null}
          </fieldset>
        </form>
      </div>
    </section>
  );
}
