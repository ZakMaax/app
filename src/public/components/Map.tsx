import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from 'leaflet'
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Helper component to update map view when location changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function Map({ location = [51.505, -0.09] }) {
  function CenteredMarker({ location }) {
    const map = useMapEvents({
      zoomend: () => {
        map.setView(location, map.getZoom());
      },
    });
    return null;
  }

  return (
    <div>
      <MapContainer
        center={location}
        zoom={15}
        maxZoom={22}
        className="h-[450px] w-full z-0"
      >
        <ChangeView center={location} zoom={15} />
        <CenteredMarker location={location} />

        <TileLayer
          url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxNativeZoom={20}
          maxZoom={22}
        />
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
          maxNativeZoom={20}
          maxZoom={22}
          zIndex={1}
        />
        <Marker position={location}>
          <Popup>Gurigu waa kan.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
