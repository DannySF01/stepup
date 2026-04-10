"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pagination: {
    currentPage: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  const { currentPage, totalPages } = pagination;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
          ${
            currentPage === 1
              ? "text-muted-foreground/30 cursor-not-allowed"
              : "text-foreground hover:bg-muted active:scale-90"
          }
        `}
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-2xl border border-border/40 backdrop-blur-sm">
        {pageNumbers.map((pageNumber) => {
          const isActive = currentPage === pageNumber;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`
                min-w-10 h-10 px-3 rounded-xl text-sm font-bold tracking-tight transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
          ${
            currentPage === totalPages
              ? "text-muted-foreground/30 cursor-not-allowed"
              : "text-foreground hover:bg-muted active:scale-90"
          }
        `}
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
