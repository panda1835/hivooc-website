import { ChevronLeft, ChevronRight } from "lucide-react";

interface SpeciesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function SpeciesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: SpeciesPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => handleChange(currentPage - 1)}
        className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 bg-white text-sm text-branding-green transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handleChange(page)}
          className={`flex h-9 min-w-[36px] items-center justify-center rounded border border-gray-200 text-sm transition ${
            page === currentPage
              ? "bg-branding-green text-white"
              : "bg-white text-branding-green hover:bg-gray-100"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => handleChange(currentPage + 1)}
        className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 bg-white text-sm text-branding-green transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
