import type { MappableResourceItem } from "../../interfaces/Resource";
import Card from "../molecules/Card";

export default function MapView({
  results,
}: {
  results: MappableResourceItem[];
}) {
  return (
    <>
      {results?.map(({ resource }) => (
        <Card
          key={resource.id}
          imageUrl={resource.imageUrl}
          brand={resource.brand}
          model={resource.model}
          options={resource.options}
          price={resource.price}
          location={
            resource.location +
            " " +
            resource.streetNumber +
            ", " +
            resource.city
          }
          fuelType={resource.fuelType}
          fuelLevel={resource.fuelLevel}
        />
      ))}
    </>
  );
}
