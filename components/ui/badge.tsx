export default function Badge({
  value,
  children,
}: {
  value: number;
  children: React.ReactNode;
}) {
  return (
    <div className="relative inline-flex">
      {children}
      <span className="absolute top-0.5 right-0.5 grid min-h-5 min-w-5 translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-500 text-xs text-white">
        {value}
      </span>
    </div>
  );
}
