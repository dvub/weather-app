'use client';
import LocalTimeDisplay from '@/components/LocalTimeDisplay';
import LocationSelector from '@/components/LocationSelector';
import MiscDisplay from '@/components/MiscDisplay';
import OverviewDisplay from '@/components/OverviewDisplay';
import WindDisplay from '@/components/WindDisplay';
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
	// if we can't get a location or whatever
	if (weather === undefined) {
		return (
			<div className='w-full'>
				<LocationSelector setCoordinates={setCoordinates} />
				<p className='text-white text-center'>No weather found...</p>
			</div>
		);
	}
	const clamp = (num: number, min: number, max: number) =>
		Math.min(Math.max(num, min), max);

	// get times in milliseconds
	const msTime = Date.now();
	const sunrise = new Date(parseInt(weather.sys.sunrise) * 1000).getTime();
	const sunset = new Date(parseInt(weather.sys.sunset) * 1000).getTime();

	// get the difference in hours (rounded down) and take the minimum one
	const sunriseDiff = Math.floor(Math.abs(sunrise - msTime) / 3600000);
	const sunsetDiff = Math.floor(Math.abs(sunset - msTime) / 3600000);
	const isDay = msTime > sunrise && msTime < sunset;
	// if it's night, multiply the minimum of diff between sunrise/set by -1,
	// so that the base variant is subtracted from
	const minDifference = Math.min(sunriseDiff, sunsetDiff) * (isDay ? 1 : -1);
	// 6 is the variant that looks like sunrise/sunset most to me, imo
	// so that's the baseline and we will add or subtract
	const variant = 6 + minDifference;
	const clamped = clamp(variant, 1, 11);

	return (
		<main className='bg-gray-900 w-screen h-screen overflow-hidden flex'>
			<div
				className={`sky-gradient-${clamped} m-5 p-5 rounded-md text-white w-full`}
			>
				<LocationSelector setCoordinates={setCoordinates} />
				<OverviewDisplay weather={weather!} />
				<div className='mt-5 other flex gap-3 flex-wrap flex-row'>
					<WindDisplay weather={weather!} />
					<LocalTimeDisplay weather={weather!} />
					<MiscDisplay weather={weather!} />
				</div>
			</div>
		</main>
	);
}
