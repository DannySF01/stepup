import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Pesquisar...",
}: SearchInputProps) {
  return (
    <div className="relative group max-w-md w-full">
      {/* Icon with focus-triggered color change */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
        <Search size={18} strokeWidth={2} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full text-sm font-medium
          bg-muted/30 hover:bg-muted/50 focus:bg-background
          border border-border/60 focus:border-primary/50
          rounded-xl px-10 py-2.5
          outline-hidden focus:ring-4 focus:ring-primary/10
          transition-all duration-200
          placeholder:text-muted-foreground/60 placeholder:font-normal
        `}
        placeholder={placeholder}
      />

      {/* Clean-up shortcut hint (optional, but looks pro) */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-muted px-1.5 py-0.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
        >
          ESC
        </button>
      )}
    </div>
  );
}
