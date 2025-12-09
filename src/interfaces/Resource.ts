export interface ResourceData {
  id?: number;
  imageUrl: string;
  model: string;
  brand: string;
  location: string;
  fuelType: string;
  fuelLevel: number;
  options: {
    winterTires: boolean;
    towbar: boolean;
  };
  price: {
    hourRate: string;
  };
}

export interface ResourceItem {
  resource: ResourceData;
}

export interface MappableResourceData extends ResourceData {
  latitude: number;
  longitude: number;
  streetNumber: string;
  city: string;
}

export interface MappableResourceItem extends ResourceItem {
  availability: boolean | null;
  resource: MappableResourceData;
}
