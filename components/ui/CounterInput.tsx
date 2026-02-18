"use client";
import { useState } from "react";

interface CounterInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function CounterInput({ value, onChange }: CounterInputProps) {
  const [amount, setAmount] = useState(value);

  function handleDecrease() {
    if (amount > 0) {
      setAmount(amount - 1);
      onChange(amount - 1);
    }
  }

  function handleIncrease() {
    setAmount(amount + 1);
    onChange(amount + 1);
  }

  return (
    <div className="w-48 max-w-sm relative mt-4">
      <label className="block mb-1 text-sm text-slate-600">Quantidade</label>
      <div className="relative">
        <button
          id="decreaseButton"
          className="absolute right-9 top-1 cursor-pointer rounded-md border border-transparent p-1.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleDecrease}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
          </svg>
        </button>
        <input
          id="amountInput"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          id="increaseButton"
          className="absolute right-1 top-1 cursor-pointer rounded-md border border-transparent p-1.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleIncrease}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
