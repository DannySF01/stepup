export default function Topbar() {
  return (
    <div className="relative flex overflow-x-hidden bg-primary py-2 text-primary-foreground text-[10px] font-black uppercase tracking-[0.25em] border-b border-white/10">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-primary via-primary/80 to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-primary via-primary/80 to-transparent z-10"></div>

      <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 whitespace-nowrap">
        <span className="flex items-center gap-2 italic">
          <span className="text-lg">🔥</span> Saldos até 50% em modelos
          selecionados
        </span>
        <span className="flex items-center gap-2 italic">
          <span className="text-lg">📦</span> Portes grátis em todas as
          encomendas
        </span>
        <span className="flex items-center gap-2 italic">
          <span className="text-lg">⭐</span> Mais de 5.000 clientes satisfeitos
        </span>
      </div>

      <div
        className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-16 whitespace-nowrap"
        aria-hidden="true"
      >
        <span className="flex items-center gap-2 italic">
          <span className="text-lg">🔥</span> Saldos até 50% em modelos
          selecionados
        </span>
        <span className="flex items-center gap-2 italic">
          <span className="text-lg">📦</span> Portes grátis em todas as
          encomendas
        </span>
        <span className="flex items-center gap-2 italic">
          <span className="text-lg">⭐</span> Mais de 5.000 clientes satisfeitos
        </span>
      </div>
    </div>
  );
}
