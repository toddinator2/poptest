'use client';
import React, { useEffect, useRef } from 'react';
import './MapDisplay.css';
import { Loader } from '@googlemaps/js-api-loader';

export default function MapDisplay({ lat, lng }) {
	const latitude = parseFloat(lat);
	const longitude = parseFloat(lng);
	const mapRef = useRef(null);

	useEffect(() => {
		const initializeMap = async () => {
			const loader = new Loader({
				apiKey: process.env.MAPS_KEY,
				version: 'quarterly',
			});

			const { Map } = await loader.importLibrary('maps');
			const locationInMap = {
				lat: latitude,
				lng: longitude,
			};

			//Marker
			const { Marker } = await google.maps.importLibrary('marker');

			const options = {
				center: locationInMap,
				zoom: 10,
				mapId: 'sbSubMap',
			};

			const map = new Map(mapRef.current, options);

			//add marker in the map
			new Marker({
				map: map,
				position: locationInMap,
			});
		};
		initializeMap();
	}, [latitude, longitude]);

	return <div className='gglMap' ref={mapRef}></div>;
}
