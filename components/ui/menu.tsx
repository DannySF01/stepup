"use client";
import { useEffect, useRef, useState } from "react";

function Menu({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode;
  title?: string;
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
      document.addEventListener("click", handleClickOutside);
    }

    return () =>
      document.removeEventListener("click", () => handleClickOutside);
  }, [isOpen]);

  return (
    <div className="my-auto">
      <div
        className={`flex items-center gap-1.5 cursor-pointer rounded-md ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        ref={menuRef}
      >
        {icon}
        <p>{title}</p>
      </div>
      {isOpen && (
        <div className="absolute z-10 min-w-45 overflow-auto rounded-lg border mt-1.5 bg-card p-1.5 shadow-sm focus:outline-none">
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
      className="flex w-full text-sm items-center rounded-md p-3 transition-all opacity-100 hover:bg-muted"
    >
      <div>{icon}</div>
      <div className="ml-2 whitespace-nowrap">{children}</div>
    </button>
  );
}

export { Menu, MenuItem };
