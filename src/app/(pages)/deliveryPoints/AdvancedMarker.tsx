"use client";

import React, { useEffect } from "react";

interface AdvancedMarkerProps {
	map: google.maps.Map;
	position: google.maps.LatLngLiteral;
	content: HTMLElement;
}

export default function AdvancedMarker({ map, position, content }: AdvancedMarkerProps) {
	useEffect(() => {
		if (!map || !window.google) return;

		const marker = new google.maps.marker.AdvancedMarkerElement({
			map,
			position,
			content,
		});

		return () => {
			// Вместо marker.setMap(null) установите map в null:
			marker.map = null;
		};
	}, [map, position, content]);

	return null;
}
