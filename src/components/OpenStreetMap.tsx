"use client";

import React from "react";
import { DeliveryPoint } from "@/types/DeliveryPoint"
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const attribution =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const url = process.env.NEXT_PUBLIC_LEAFLET_URL;

interface OpenStreetMapProps {
	deliveryPoints: DeliveryPoint[];
}


const customIcon = L.icon({
	iconUrl: "/logo.svg",
	iconSize: [25, 25],
	iconAnchor: [20, 25],
	popupAnchor: [0, -25],
});

export default function OpenStreetMap({ deliveryPoints }: OpenStreetMapProps) {
	const center = { lat: 51.169392, lng: 71.449074 }; // Центр Астаны

	return (
		<div style={{ width: "70%", height: "100vh" }}>
			<MapContainer
				center={center}
				zoom={11}
				style={{ width: "100%", height: "100%" }}
			>
				<TileLayer attribution={attribution} url={url!} />
				{deliveryPoints.map((point) => (
					<Marker key={point.id} position={[point.coordinates.lat, point.coordinates.lng]} icon={customIcon}>
						<Popup>
							<div>
								<h3>{point.address}</h3>
								<p>
									{point.workingTime.days}: {point.workingTime.open} - {point.workingTime.close}
								</p>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
