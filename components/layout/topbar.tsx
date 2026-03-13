export default function Topbar() {
  return (
    <div className="relative flex overflow-x-hidden bg-primary py-1.5 text-white text-sm tracking-widest">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-primary to-transparent z-10"></div>
      <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 pl-12">
        <span>🔥 SALDOS ATÉ 50% EM PRODUTOS SELECIONADOS</span>
        <span>📦 PORTES GRÁTIS EM TODAS AS ENCOMENDAS</span>
        <span>⭐ MAIS DE 5.000 CLIENTES SATISFEITOS</span>
      </div>
      <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 pl-12">
        <span>🔥 SALDOS ATÉ 50% EM PRODUTOS SELECIONADOS</span>
        <span>📦 PORTES GRÁTIS EM TODAS AS ENCOMENDAS</span>
        <span>⭐ MAIS DE 5.000 CLIENTES SATISFEITOS</span>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-primary to-transparent z-10"></div>
    </div>
  );
}
