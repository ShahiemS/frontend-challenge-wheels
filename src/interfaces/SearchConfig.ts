import type { MappableResourceItem } from "../interfaces/Resource";

export enum FuelType {
  Benzine = "benzine",
  Elektrisch = "elektrisch",
}

export enum View {
  Carpool,
  List,
  Map,
}

export interface SearchState {
  view: View;
  page: number;
  limit: number;
  totalPages: number;
  hasWinterTire: boolean;
  hasTowBar: boolean;
  isAvailable: boolean;
  isLoading: boolean;
  fuelType: FuelType | null;

  searchResults: MappableResourceItem[];
  paginatedResults: MappableResourceItem[];

  getFilteredResults: () => MappableResourceItem[];
  setView: (view: View) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchResults: (items: MappableResourceItem[]) => void;
  setPage: (page: number) => void;
  resetResults: () => void;
  toggleWinterTireFilter: () => void;
  toggleTowbarFilter: () => void;
  toggleAvailabilityFilter: () => void;
  toggleFuelTypeFilter: (fuelType: FuelType) => void;
}

export interface FilterTypes {
  models: string[];
}

export interface SearchConfig {
  method: "search.map";
  params: {
    filter?: FilterTypes;
    locationPoint: {
      latitudeMax: number;
      latitudeMin: number;
      longitudeMax: number;
      longitudeMin: number;
    };
  };
}
