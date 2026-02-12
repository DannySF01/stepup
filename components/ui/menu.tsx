"use client";
import { useEffect, useRef, useState } from "react";

function Menu({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
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
      document.addEventListener("click", handleClickOutside);
    }

    return () =>
      document.removeEventListener("click", () => handleClickOutside);
  }, [isOpen]);

  return (
    <div>
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        ref={menuRef}
      >
        {icon}
        <p>{title}</p>
      </div>
      {isOpen && (
        <div className="absolute z-10 min-w-45 overflow-auto rounded-lg border mt-2 border-slate-200 bg-white p-1.5 shadow-sm focus:outline-none">
          {children}
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  onClick,
  children,
}: {
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      id="menu-item"
      onClick={onClick}
      className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
    >
      <div className="text-slate-400">{icon}</div>
      <div className="text-slate-800 font-medium ml-2">{children}</div>
    </button>
  );
}

export { Menu, MenuItem };
