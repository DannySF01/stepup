interface TagProps {
  status: string | null;
  children: React.ReactNode;
}

export default function Tag({ status, children }: TagProps) {
  const style =
    status === "active"
      ? "text-primary-foreground bg-primary"
      : "text-warning-foreground bg-warning/30";
  return (
    <span
      className={`capitalize inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
        style
      } `}
    >
      {children}
    </span>
  );
}
