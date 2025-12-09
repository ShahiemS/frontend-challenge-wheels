import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import type { MappableResourceItem } from "../../interfaces/Resource";

export default function MapView({
  results,
}: {
  results: MappableResourceItem[];
}) {
  const markerIcon = L.icon({
    iconUrl: "/silhouette.png",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
  });

  const createClusterCustomIcon = (cluster: {
    getChildCount(): number;
  }): L.DivIcon => {
    const count = cluster.getChildCount();

    return L.divIcon({
      html: `
        <div class="w-10 h-10 rounded-full bg-green-100 border border-green-400 text-green-800 font-semibold flex items-center justify-center shadow-lg">
          ${count}
        </div>
      `,
      iconSize: [16, 16],
    });
  };

  return (
    <MapContainer
      center={[52.1326, 5.2913]} // Lat and long of the Netherlands
      zoom={10}
      className="w-full h-[600px] rounded-2xl"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {results?.map(({ resource }) => (
          <Marker
            key={resource.id}
            position={[resource.latitude, resource.longitude]}
            icon={markerIcon}
          >
            <Popup maxWidth={300}>
              <div className="w-72 font-sans">
                <img
                  src={resource.imageUrl}
                  alt={resource.model}
                  className="w-full h-36 object-cover rounded-t-lg"
                />

                <div className="p-3 bg-white rounded-b-lg">
                  <h3 className="text-lg font-semibold">
                    {resource.brand} {resource.model}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {resource.location}&nbsp;
                    {resource.streetNumber},&nbsp;
                    {resource.city}
                  </p>

                  <ul className="space-y-2 text-sm">
                    <li className="gap-1 flex">
                      <span className="font-medium">Prijs/uur:</span> €
                      {resource.price.hourRate}
                    </li>
                    <li className="gap-1 flex">
                      <span className="font-medium">Brandstof:</span>
                      {resource.fuelType}
                    </li>
                    <li className="gap-1 flex">
                      <span className="font-medium">Brandstof percentage:</span>
                      {resource.fuelLevel}%
                    </li>
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
