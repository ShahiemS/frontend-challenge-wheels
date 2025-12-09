import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import type { MouseEventHandler } from "react";

export default function FilterButton({
  onClick,
  active,
  icon,
  label,
  arrow,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  active: boolean;
  icon: IconSvgElement;
  label: string;
  arrow?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`border px-4 py-2 text-xs rounded-2xl cursor-pointer gap-3 flex items-center 
            ${
              active
                ? "border-green-500 bg-green-100 text-green-500"
                : "bg-white border-gray-300"
            }`}
    >
      <HugeiconsIcon icon={icon} size={18} />
      {label}
      {arrow && <HugeiconsIcon icon={ArrowDown01Icon} size={18} />}
    </button>
  );
}
