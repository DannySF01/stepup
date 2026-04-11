"use client";
import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

interface CounterInputProps {
  value: number;
  title?: string;
  onChange: (value: number) => void;
}

export default function CounterInput({
  value,
  title,
  onChange,
}: CounterInputProps) {
  const [amount, setAmount] = useState(value);

  const updateValue = (newValue: number) => {
    if (newValue >= 1) {
      setAmount(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      {title && (
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
          {title}
        </span>
      )}

      <div className="flex items-center bg-muted/20 rounded-2xl border border-border/40 p-1.5 transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
        <button
          onClick={() => updateValue(amount - 1)}
          disabled={amount <= 1}
          className="h-10 w-10 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-background hover:text-foreground transition-all active:scale-95 disabled:opacity-20 disabled:pointer-events-none border border-transparent hover:border-border/60"
          type="button"
        >
          <Minus size={14} strokeWidth={3} />
        </button>

        <input
          type="number"
          value={amount}
          onChange={(e) => updateValue(parseInt(e.target.value) || 1)}
          className="w-12 border-0 bg-transparent text-center font-black tracking-tighter text-base text-foreground focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={() => updateValue(amount + 1)}
          className="h-10 w-10 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-background hover:text-primary transition-all active:scale-95 border border-transparent hover:border-border/60"
          type="button"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
