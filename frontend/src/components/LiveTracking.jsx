import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from 'react-leaflet';

function FitBounds() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds([
      [31.6842, 76.5255], // Hamirpur
      [32.2190, 76.3234]  // Dharamshala
    ]);
  }, [map]);

  return null;
}

function LiveTracking() {
  const hamirpur = [31.6842, 76.5255];
  const dharamshala = [32.2190, 76.3234];

  return (
    <MapContainer
      center={hamirpur}
      zoom={10}
      style={{ height: '500px', width: '100%' }}
    >
      <FitBounds />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={hamirpur}>
        <Popup>Hamirpur (Pickup)</Popup>
      </Marker>

      <Marker position={dharamshala}>
        <Popup>Dharamshala (Destination)</Popup>
      </Marker>

      <Polyline
        positions={[hamirpur, dharamshala]}
        pathOptions={{
          color: 'red',
          weight: 5
        }}
      />
    </MapContainer>
  );
}

export default LiveTracking;