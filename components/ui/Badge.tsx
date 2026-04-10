export default function Badge({
  value,
  children,
}: {
  value: number;
  children: React.ReactNode;
}) {
  if (value === 0) return <div className="relative">{children}</div>;

  return (
    <div className="relative">
      {children}
      <span className="absolute translate-x-1/4 -translate-y-1/4 -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-black tracking-tighter text-white ring-2 ring-background animate-in zoom-in duration-300 shadow-lg shadow-primary/20">
        {value > 99 ? "99+" : value}
      </span>
    </div>
  );
}
