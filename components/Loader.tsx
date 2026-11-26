"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/config";

export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setShow(false), 1900);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(timer);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="loader"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="fan" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85, duration: 0.45 }}
            className="mt-6 flex items-center gap-3"
          >
            <Image src="/marca.png" alt="" width={48} height={48} priority />
            <p className="font-display text-xl font-semibold text-ink">{site.shortName}</p>
          </motion.div>
          <p className="sr-only">Cargando la página</p>
          <button type="button" className="btn-ghost mt-6" onClick={() => setShow(false)}>
            Entrar
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
