import { useState, useEffect } from "react";
import { useApi } from "../../api";
import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CarTimeIcon,
  FuelStationIcon,
  ListViewIcon,
  MapsIcon,
  SnowIcon,
  TowTruckIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import FilterButton from "../atoms/FilterButton";
import {
  FuelType,
  View,
  type SearchConfig,
} from "../../interfaces/SearchConfig";
import { useSearchStore } from "../../store/useSearchStore";

enum FilterOptions {
  Availability,
  WinterTires,
  FuelType,
  Towbar = "availaiblty",
}

export default function Header() {
  const [modelTerms, setModelTerm] = useState<string[]>([]);
  const [filterOpenend, setFilterOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchConfig, setSearchConfig] = useState<SearchConfig>({
    method: "search.map",
    params: {
      locationPoint: {
        latitudeMax: 56,
        latitudeMin: 48,
        longitudeMax: 9,
        longitudeMin: 1,
      },
    },
  });

  const { data, isLoading } = useApi(searchConfig);

  const view = useSearchStore(({ view }) => view);
  const isAvailable = useSearchStore(({ isAvailable }) => isAvailable);
  const hasTowBar = useSearchStore(({ hasTowBar }) => hasTowBar);
  const hasWinterTire = useSearchStore(({ hasWinterTire }) => hasWinterTire);
  const fuelType = useSearchStore(({ fuelType }) => fuelType);
  const filteredCount = useSearchStore((s) => s.getFilteredResults().length);

  const setView = useSearchStore(({ setView }) => setView);
  const setSearchResults = useSearchStore(
    ({ setSearchResults }) => setSearchResults
  );
  const setIsLoading = useSearchStore(({ setIsLoading }) => setIsLoading);

  const toggleFuelTypeFilter = useSearchStore(
    ({ toggleFuelTypeFilter }) => toggleFuelTypeFilter
  );
  const toggleTowbarFilter = useSearchStore(
    ({ toggleTowbarFilter }) => toggleTowbarFilter
  );
  const toggleAvailabilityFilter = useSearchStore(
    ({ toggleAvailabilityFilter }) => toggleAvailabilityFilter
  );
  const toggleWinterTireFilter = useSearchStore(
    ({ toggleWinterTireFilter }) => toggleWinterTireFilter
  );

  const resetResults = useSearchStore(({ resetResults }) => resetResults);

  const fuelFilters: FuelType[] = [FuelType.Benzine, FuelType.Elektrisch];

  const onSubmit = () => {
    // Automatically add a tag from the search input when Enter is not used
    const searchValue = searchInput.trim();
    const newModelTerms = searchValue
      ? [...modelTerms, searchValue]
      : modelTerms;

    addTag(searchInput);

    // Set search configuration for the api
    setSearchConfig((original) => ({
      ...original,
      params: {
        ...original.params,
        filter: {
          models: newModelTerms,
        },
      },
    }));
  };

  const addTag = (tag: string) => {
    if (searchInput.trim() === "") return;
    setModelTerm((prev) => [...prev, tag]);
    setSearchInput("");
  };

  const onInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    addTag(searchInput);
  };

  const filterBy = ({
    option,
    fuelType,
  }: {
    option: FilterOptions;
    fuelType?: FuelType;
  }) => {
    if (option === FilterOptions.Availability) {
      toggleAvailabilityFilter();
    }

    if (option === FilterOptions.FuelType && fuelType) {
      toggleFuelTypeFilter(fuelType);
    }

    if (option === FilterOptions.Towbar) {
      toggleTowbarFilter();
    }

    if (option === FilterOptions.WinterTires) {
      toggleWinterTireFilter();
    }

    resetResults();
  };

  useEffect(() => {
    setIsLoading(isLoading);

    if (!data) return;

    const { result: { results } = { results: [] } } = data;

    setSearchResults(results);
  }, [data, isLoading, setIsLoading, setSearchResults]);

  return (
    <>
      <div className="bg-green-500 p-10 space-y-6">
        <div className="w-full space-y-3">
          <div className="bg-white/30 backdrop-blur flex items-center justify-between rounded-xl px-5 py-4 w-full">
            <div className="flex flex-wrap gap-2 w-full">
              {modelTerms?.map((term, defaultKey) => (
                <div
                  key={defaultKey}
                  className="border px-4 py-2 text-xs rounded-2xl cursor-pointer gap-3 flex justify-between items-center 
            border-green-500 bg-green-100 text-green-500"
                >
                  {term}
                  <HugeiconsIcon
                    size={16}
                    onClick={() =>
                      setModelTerm(
                        modelTerms.filter(
                          (_item, itemKey) => itemKey !== defaultKey
                        )
                      )
                    }
                    icon={Cancel01Icon}
                  />
                </div>
              ))}

              <input
                onKeyDown={onInputEnter}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-white/70 text-base ml-3"
                placeholder="Zoek op model"
                value={searchInput}
              />
            </div>

            <button
              className="text-white cursor-pointer"
              onClick={() => onSubmit()}
            >
              <HugeiconsIcon icon={SearchIcon} size={18} />
            </button>
          </div>

          <span className="flex justify-end text-sm text-white">
            Druk op Enter om meerdere modellen toe te voegen
          </span>
        </div>
      </div>

      {!isLoading && (
        <div className="px-10 pt-10 space-y-4">
          <h1 className="text-xl text-green-600 font-semibold">
            {filteredCount}
            {filteredCount === 1 ? " resultaat" : " resultaten"} gevonden
          </h1>

          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <FilterButton
                onClick={() => setFilterOpen(!filterOpenend)}
                active={!!fuelType}
                arrow={true}
                label="Brandstof"
                icon={FuelStationIcon}
              />

              <FilterButton
                onClick={() => filterBy({ option: FilterOptions.Availability })}
                active={isAvailable}
                label="Beschikbaar"
                icon={CarTimeIcon}
              />

              <FilterButton
                onClick={() => filterBy({ option: FilterOptions.Towbar })}
                active={!hasTowBar}
                label="Trekhaak"
                icon={TowTruckIcon}
              />

              <FilterButton
                onClick={() => filterBy({ option: FilterOptions.WinterTires })}
                active={!hasWinterTire}
                label="Winterbanden"
                icon={SnowIcon}
              />
            </div>
            <div className="flex items-center gap-2 self-start md:self-center">
              <FilterButton
                onClick={() => setView(View.List)}
                active={view === View.List}
                label="Lijst"
                icon={ListViewIcon}
              />

              <FilterButton
                onClick={() => setView(View.Map)}
                active={view === View.Map}
                label="Map"
                icon={MapsIcon}
              />
            </div>
          </div>

          {fuelFilters?.length > 0 && filterOpenend && (
            <div className="bg-white p-4 rounded-2xl border border-gray-300 flex gap-4">
              {fuelFilters.map((item, index) => {
                return (
                  <label
                    key={index}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="fuel"
                      value={item}
                      onChange={() =>
                        filterBy({
                          option: FilterOptions.FuelType,
                          fuelType: item,
                        })
                      }
                      checked={fuelType === item}
                    />
                    <span className="first-letter:uppercase">{item}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
