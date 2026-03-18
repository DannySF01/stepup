export const PAGE_SIZE = 10;

export function getPagination(page: string | undefined) {
  const currentPage = Number(page) || 1;
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  return { from, to, currentPage };
}

export function getTotalPages(count: number | null) {
  return Math.ceil((count || 1) / PAGE_SIZE);
}
