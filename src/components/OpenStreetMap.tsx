"use client"

import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

const attribution =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const url =
	"https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=puoG6vOLC4oqJXcum8fR";

const OpenStreetMap = () => {
	const [center, setCenter] = useState({
		lat: 43.238949, lng: 76.889709
	});

	return (
		<div>
			<MapContainer center={center} zoom={9}>
				<TileLayer attribution={attribution} url={url} />
				<Marker position={[23.729211164246585, 90.40874895549243]}>
					<Popup>This is a popup.</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default OpenStreetMap;