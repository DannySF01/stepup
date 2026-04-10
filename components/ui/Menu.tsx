"use client";
import { useEffect, useRef, useState } from "react";

function Menu({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode;
  title?: string | string[];
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 cursor-pointer rounded-xl transition-all active:scale-95 ${className}`}
      >
        <div className="flex items-center justify-center transition-colors group-hover:text-primary">
          {icon}
        </div>
        {title && (
          <p className="hidden lg:block text-sm font-bold tracking-tight text-foreground">
            {title}
          </p>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 min-w-55 overflow-hidden rounded-2xl border border-border/40 bg-background/95 backdrop-blur-md p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col gap-1">{children}</div>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  onClick,
  children,
  className,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 rounded-xl p-3 text-sm font-semibold 
        text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary
        active:scale-[0.98] group ${className}
      `}
    >
      <div className="shrink-0 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="whitespace-nowrap tracking-tight">{children}</div>
    </button>
  );
}

export { Menu, MenuItem };
