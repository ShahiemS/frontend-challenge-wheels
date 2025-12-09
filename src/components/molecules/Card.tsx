import { HugeiconsIcon } from "@hugeicons/react";
import {
  BatteryFullIcon,
  Cancel01Icon,
  Car01Icon,
  FuelStationIcon,
  Location01Icon,
  SnowIcon,
  Tick02Icon,
  TowTruckIcon,
} from "@hugeicons/core-free-icons";
import type { ResourceData } from "../../interfaces/Resource";
import { useSearchStore } from "../../store/useSearchStore";
import { View } from "../../interfaces/SearchConfig";

export default function Card({
  imageUrl,
  brand,
  model,
  options,
  fuelType,
  fuelLevel,
  price,
  location,
}: ResourceData) {
  const setView = useSearchStore(({ setView }) => setView);
  return (
    <div
      className="
      w-full bg-white rounded-xl border border-gray-200 p-4 
      flex flex-col sm:flex-row gap-4
    "
    >
      <div
        className="
        bg-gray-50 border border-gray-200 rounded-xl relative overflow-hidden
        w-full h-40 sm:w-40 sm:h-32 flex items-center justify-center
      "
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            className="h-[90px] object-contain"
            alt={brand + " " + model}
          />
        ) : (
          <HugeiconsIcon icon={Car01Icon} size={100} />
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
        <h2 className="text-xl font-semibold">
          {brand} {model}
        </h2>

        <div className="flex flex-col gap-2 text-gray-600 px-2 pt-4 sm:items-start items-center">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Car01Icon} size={18} />
            <span className="first-letter:uppercase">
              Model: {model || "-"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={FuelStationIcon} size={18} />
            <span className="first-letter:uppercase">
              Brandstof: {fuelType || "-"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={SnowIcon} size={18} />
            Winterbanden:
            {options.winterTires ? (
              <HugeiconsIcon icon={Tick02Icon} />
            ) : (
              <HugeiconsIcon icon={Cancel01Icon} />
            )}
          </div>

          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={TowTruckIcon} size={18} />
            Trekhaak:{" "}
            {options.towbar ? (
              <HugeiconsIcon icon={Tick02Icon} />
            ) : (
              <HugeiconsIcon icon={Cancel01Icon} />
            )}
          </div>

          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Location01Icon} size={18} />
            {location || "-"}
          </div>
        </div>
      </div>

      <div
        className="
        flex sm:flex-col flex-row sm:items-end items-center justify-between 
        gap-4 sm:gap-0
      "
      >
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <HugeiconsIcon icon={BatteryFullIcon} size={18} />
          {fuelLevel || "0"}%
        </div>

        <div className="flex flex-col items-end sm:items-end">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            &euro; {price.hourRate}
            <span className="text-xs text-gray-500">per uur</span>
          </div>

          <button
            onClick={() => setView(View.Carpool)}
            className="bg-green-100 px-4 py-2 mt-4 cursor-pointer border border-green-300 text-green-900 rounded-full text-sm font-semibold flex items-center gap-3 hover:bg-green-200"
          >
            Carpool
          </button>
        </div>
      </div>
    </div>
  );
}
