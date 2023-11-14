'use client';
import LocationSelector from '@/components/locationSelector';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Select, { InputActionMeta } from 'react-select';

export default function Home() {
	const [location, setLocation] = useState({
		searchTerm: '',
		options: [],
	});
	const key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;
	const endpoint = process.env.NEXT_PUBLIC_GEO_ENDPOINT;
	const limit = 3;

	const updateLocationOptions = (query: string) => {
		axios
			.get(`${endpoint}?q=${query}&limit=${limit}&appid=${key}`)
			.then((response) => {
				const options = response.data.map((location: any) => {
					return {
						label: `${location.name}, ${location.state}`,
						value: location,
					};
				});
				setLocation({ ...location, options: options });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onLocationChange = (
		newValue: string,
		actionMeta: InputActionMeta
	) => {
		if (newValue === undefined) {
			return;
		}
		setLocation({ ...location, searchTerm: newValue });
	};

	React.useEffect(() => {
		const getDataTimeout = setTimeout(() => {
			updateLocationOptions(location.searchTerm);
		}, 2000);

		return () => clearTimeout(getDataTimeout);
	}, [location.searchTerm]);

	return (
		<main>
			<div>
				<h1>Hello world</h1>
			</div>
			<LocationSelector setCoordinates={''} />
		</main>
	);
}
