export default function Select({
  name,
  value,
  options,
  onchange,
}: {
  name?: string;
  value: string;
  options: { label: string; value: string }[];
  onchange: (value: string) => void;
}) {
  return (
    <div className="relative group w-full">
      <select
        className={`
          w-full cursor-pointer appearance-none rounded-xl
          bg-muted/20 hover:bg-muted/40 
          border border-border/60 hover:border-primary/40
          pl-4 pr-10 py-2.5
          text-sm font-semibold tracking-tight text-foreground
          outline-hidden focus:ring-4 focus:ring-primary/10 focus:border-primary/50
          transition-all duration-300 shadow-sm
        `}
        value={value}
        onChange={(e) => onchange(e.target.value)}
        name={name}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-background text-foreground font-medium"
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground group-hover:text-primary transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  );
}
