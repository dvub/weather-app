'use client';
import LocationSelector from '@/components/locationSelector';
import WeatherBackground from '@/components/WeatherBackground';
import WeatherDisplay from '@/components/WeatherDisplay';
import { WeatherAPIResponse } from '@/types/';
import axios from 'axios';
import React from 'react';

export default function Home() {
	const endpoint = process.env.NEXT_PUBLIC_WEATHER_ENDPOINT;
	const key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;
	const [coordinates, setCoordinates] = React.useState<{
		latitude: number;
		longitude: number;
	}>();
	const [weather, setWeather] = React.useState<WeatherAPIResponse>();

	// whenever the LocationSelector componenet updates the coordinates,
	// we will run this code - this should make an API request now that we have the coords
	//
	React.useEffect(() => {
		if (!(coordinates?.latitude && coordinates?.longitude)) {
			return;
		}
		getWeatherData(coordinates.latitude, coordinates.longitude);
	}, [coordinates]);

	const getWeatherData = (latitude: number, longitude: number) => {
		axios
			.get<WeatherAPIResponse>(
				`${endpoint}?lat=${latitude}&lon=${longitude}&appid=${key}`
			)
			.then((response) => {
				console.log(response.data);
				setWeather(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<main>
			<WeatherBackground weather={weather!} />
			<LocationSelector setCoordinates={setCoordinates} />
			<WeatherDisplay weather={weather} />
			<p>TODO: metric toggle</p>
		</main>
	);
}
