"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { branches } from "./map-data";
import { Icon, IconOptions } from "leaflet";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });


export default function TolidoMap() {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [customIcon, setCustomIcon] = useState<Icon<IconOptions>>();

  useEffect(() => {

    // Create custom icon after leaflet loads
    const loadLeaflet = async () => {
      const leaflet = await import("leaflet");
      const icon = leaflet.default.icon({
        iconUrl: "/tolido logo.png", // مسار اللوجو
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35],
      });
      setCustomIcon(icon);
      setLeafletLoaded(true);
    };

    loadLeaflet();
  }, []);

  if (!leafletLoaded) {
    return (
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={[25, 20]} // مركز الخريطة
        zoom={2.5}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {branches.map((b) => (
          <Marker key={b.name} position={[b.lat, b.lng]} icon={customIcon}>
            <Popup>
              <span className="font-semibold">{b.name}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
