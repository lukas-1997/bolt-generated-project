import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapView({ listings, onMarkerClick }) {
  return (
    <MapContainer 
      center={[52.5200, 13.4050]} 
      zoom={12} 
      className="h-full w-full rounded-lg"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.latitude, listing.longitude]}
          eventHandlers={{
            click: () => onMarkerClick(listing)
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{listing.title}</h3>
              <p className="text-sm">${listing.price}/night</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
