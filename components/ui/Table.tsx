import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Column<T> {
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[] | null;
  columns: Column<T>[];
  columnCount: number;
  onRowClick?: (item: T) => void;
}

export default function DataTable<T>({
  data,
  columns,
  columnCount,
  onRowClick,
}: DataTableProps<T>) {
  const router = useRouter();
  return (
    <div className="w-full">
      <div
        className={`grid grid-cols-${columnCount} gap-6 px-3 border-b pb-3 text-muted-foreground`}
      >
        {columns.map((col, index) => (
          <div key={index} className={col.className}>
            {col.header}
          </div>
        ))}
      </div>

      <div className="divide-y">
        {data?.length ? (
          data.map((item, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-${columnCount} gap-6 p-3 hover:bg-muted/50 cursor-pointer items-center`}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((col, colIndex) => (
                <div key={colIndex} className={col.className}>
                  {col.render(item)}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            Sem resultados encontrados.
          </div>
        )}
      </div>
    </div>
  );
}
