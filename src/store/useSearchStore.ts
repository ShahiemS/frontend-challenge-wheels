import { create } from "zustand";
import { type SearchState, View } from "../interfaces/SearchConfig";

export const useSearchStore = create<SearchState>((set, get) => ({
  view: View.List,
  searchResults: [],
  paginatedResults: [],
  page: 1,
  limit: 15,
  totalPages: 0,
  hasWinterTire: false,
  hasTowBar: false,
  isAvailable: true,
  isLoading: false,
  fuelType: null,

  getFilteredResults: () => {
    const { searchResults, hasWinterTire, hasTowBar, fuelType, isAvailable } =
      get();

    let results = searchResults;

    // Apply availability filter; API uses null to represent an available item
    results = results.filter(
      (item) => item.availability === (isAvailable ? null : false)
    );

    // Apply fuel type filter
    if (fuelType)
      results = results.filter((item) => item.resource.fuelType === fuelType);

    // Apply winter tires filter
    if (hasWinterTire)
      results = results.filter(
        (item) => item.resource.options.winterTires === false
      );

    // Apply towbar filter
    if (hasTowBar)
      results = results.filter(
        (item) => item.resource.options.towbar === false
      );

    return results;
  },

  setView: (view) => set({ view }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchResults: (items) => {
    set((state) => ({
      searchResults: items,
      paginatedResults: items.slice(0, state.limit),
      totalPages: Math.ceil(items.length / state.limit),
    }));
  },

  setPage: (page) => {
    const { limit, getFilteredResults } = get();

    set(() => ({
      page,
      paginatedResults: getFilteredResults().slice(
        (page - 1) * limit,
        page * limit
      ),
    }));
  },

  resetResults: () => {
    const { limit, getFilteredResults } = get();

    const results = getFilteredResults();

    set(() => ({
      page: 1,

      totalPages: Math.ceil(results.length / limit),
      paginatedResults: results.slice(0, 1 * limit),
    }));
  },
  toggleWinterTireFilter: () =>
    set((state) => ({ hasWinterTire: !state.hasWinterTire })),
  toggleTowbarFilter: () => set((state) => ({ hasTowBar: !state.hasTowBar })),
  toggleAvailabilityFilter: () =>
    set((state) => ({ isAvailable: !state.isAvailable })),
  toggleFuelTypeFilter: (fuelType) => set((state) => ({ fuelType })),
}));
