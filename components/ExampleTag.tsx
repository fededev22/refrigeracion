export function ExampleTag({ children = "Contenido de ejemplo" }: { children?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
      {children}
    </span>
  );
}
