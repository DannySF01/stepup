interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-primary h-3 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
