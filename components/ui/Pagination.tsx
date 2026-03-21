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
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-1 px-3 py-2 rounded-md ${
          currentPage === 1 ? "text-muted" : "bg-transparent"
        }`}
      >
        {"<"}
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`mx-1 px-3 py-2 rounded-md ${
            currentPage === pageNumber ? "bg-muted" : "bg-transparent"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-1 px-3 py-2 rounded-md ${
          currentPage === totalPages ? "text-muted" : "bg-transparent"
        }`}
      >
        {">"}
      </button>
    </div>
  );
}
