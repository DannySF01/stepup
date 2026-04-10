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
  return (
    <div className="w-full overflow-x-auto">
      <div
        className="grid items-center gap-4 px-6 py-4 border-b border-border/40 bg-muted/5 text-xs font-bold uppercase tracking-widest text-muted-foreground/80"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((col, index) => (
          <div key={index} className={col.className}>
            {col.header}
          </div>
        ))}
      </div>

      <div className="divide-y divide-border/40">
        {data?.length ? (
          data.map((item, rowIndex) => (
            <div
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(item)}
              className={`
                grid items-center gap-4 px-6 py-4 transition-all duration-200
                ${onRowClick ? "cursor-pointer hover:bg-muted/30" : ""}
                group
              `}
              style={{
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              }}
            >
              {columns.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className={`text-sm text-foreground/90 font-medium ${col.className}`}
                >
                  {col.render(item)}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-20 text-muted-foreground bg-muted/2">
            <div className="p-4 rounded-full bg-muted/20 mb-4">
              <div className="w-8 h-8 border-2 border-dashed border-muted-foreground/40 rounded-md" />
            </div>
            <p className="text-sm font-medium tracking-tight">
              Nenhum resultado encontrado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
