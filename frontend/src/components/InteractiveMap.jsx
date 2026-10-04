import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function InteractiveMap({
  center = [9.9195, 78.1193], // Default Madurai
  zoom = 13,
  radiusKm = 5,
  items = [],
  selectedItem = null,
  onSelectItem = null
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const circleLayerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center, circle, and markers when props change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.setView(center, zoom);

    // Update Circle for Radius
    if (circleLayerRef.current) {
      circleLayerRef.current.remove();
    }

    if (radiusKm > 0) {
      circleLayerRef.current = L.circle(center, {
        color: '#f97316',
        fillColor: '#ea580c',
        fillOpacity: 0.12,
        weight: 2,
        dashArray: '4, 4',
        radius: radiusKm * 1000 // Convert km to meters
      }).addTo(map);
    }

    // Clear old markers
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    }

    // Add Center Pin
    const centerIcon = L.divIcon({
      className: 'custom-center-pin',
      html: `
        <div style="background-color: #dc2626; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
          📍
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 34]
    });

    L.marker(center, { icon: centerIcon })
      .addTo(markersLayerRef.current)
      .bindPopup(`<b>Center Location</b><br/>Proximity Radius: ${radiusKm} km`);

    // Add surrounding items
    items.forEach((item) => {
      if (!item.latitude || !item.longitude) return;

      let iconBg = '#3b82f6'; // default hotel blue
      let iconEmoji = '🏨';
      if (item.type === 'restaurant' || item.cuisine) {
        iconBg = '#10b981';
        iconEmoji = '🍴';
      } else if (item.type === 'attraction' || item.opening_time) {
        iconBg = '#f59e0b';
        iconEmoji = '🛕';
      } else if (item.type === 'guide' || item.languages) {
        iconBg = '#8b5cf6';
        iconEmoji = '👤';
      } else if (item.type === 'experience') {
        iconBg = '#ec4899';
        iconEmoji = '🎭';
      }

      const itemIcon = L.divIcon({
        className: 'custom-item-pin',
        html: `
          <div style="background-color: ${iconBg}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; border: 2px solid white; box-shadow: 0 3px 5px rgba(0,0,0,0.25);">
            ${iconEmoji}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28]
      });

      const popupContent = `
        <div style="min-width: 170px;">
          <h4 style="margin: 0 0 4px 0; font-weight: bold; font-size: 13px;">${item.name}</h4>
          <span style="display: inline-block; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: #f1f5f9; color: #475569; margin-bottom: 6px;">
            ${item.category || item.cuisine || item.speciality || item.type || ''}
          </span>
          ${item.distance_km ? `<div style="font-size: 11px; color: #f97316; font-weight: bold; margin-bottom: 4px;">📍 ${item.distance_km} km away</div>` : ''}
          <div style="font-size: 11px; color: #64748b; line-height: 1.3;">
            ${item.description || item.speciality || item.price_range || ''}
          </div>
        </div>
      `;

      const marker = L.marker([item.latitude, item.longitude], { icon: itemIcon })
        .addTo(markersLayerRef.current)
        .bindPopup(popupContent);

      if (selectedItem && selectedItem.id === item.id) {
        marker.openPopup();
      }
    });

  }, [center, zoom, radiusKm, items, selectedItem]);

  return (
    <div className="relative w-full h-full min-h-[350px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
      <div ref={mapContainerRef} className="w-full h-full" />
      {/* Legend Badge Overlay */}
      <div className="absolute top-3 right-3 z-[400] bg-white/95 backdrop-blur-xs px-3 py-2 rounded-xl shadow-md border border-slate-200/80 text-[11px] flex flex-col gap-1">
        <div className="font-bold text-slate-800 border-b pb-1 mb-0.5">Map Legend</div>
        <div className="flex items-center gap-1.5"><span className="text-sm">📍</span> Center ({radiusKm}km radar)</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Attractions</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Restaurants</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Hotels</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Guides & Tours</div>
      </div>
    </div>
  );
}
