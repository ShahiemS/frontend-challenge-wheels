import type { MouseEventHandler } from "react";

export default function Button({
  onClick,
  label,
  disabled = false,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 mt-4 border rounded-full text-sm font-semibold flex items-center gap-3
        ${
          disabled
            ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-green-100 border-green-300 text-green-900 cursor-pointer hover:bg-green-200"
        }`}
    >
      {label}
    </button>
  );
}
