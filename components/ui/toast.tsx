"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type ToastType = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "error";
};

type ToastContextType = {
  toast: (data: Omit<ToastType, "id">) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = ({
    title,
    description,
    variant = "default",
  }: Omit<ToastType, "id">) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, title, description, variant }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <AnimatedToast
            key={t.id}
            toast={t}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function AnimatedToast({
  toast,
  onClose,
}: {
  toast: ToastType;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      role="alert"
      className={`mt-3 relative flex w-full p-3 text-sm text-white rounded-md transform transition-all duration-300 ease-out ${toast.variant === "error" ? "bg-red-500" : "bg-primary"} ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-5 w-5 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        ></path>
      </svg>
      {toast.description && <p>{toast.description}</p>}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
