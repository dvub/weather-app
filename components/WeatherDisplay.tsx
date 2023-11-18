import { WeatherAPIResponse } from '@/types';
import React from 'react';
import LocalTimeDisplay from './LocalTimeDisplay';
import WindDisplay from './WindDisplay';
import MiscDisplay from './MiscDisplay';
import OverviewDisplay from './OverviewDisplay';
import WeatherBackground from './WeatherBackground';

export default function WeatherDisplay(props: {
	weather: WeatherAPIResponse | undefined;
}) {
	const { weather } = props;
	// if we can't get a location or whatever
	if (weather === undefined) {
		return (
			<div>
				<p>No weather found :\</p>
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
		<div
			className={`sky-gradient-${clamped} m-5 p-5 rounded-md text-white`}
		>
			<WeatherBackground weather={weather!} />
			<OverviewDisplay weather={weather} />
			<div className='mt-5 other flex gap-3'>
				<WindDisplay weather={weather} />
				<LocalTimeDisplay weather={weather} />
				<MiscDisplay weather={weather} />
			</div>
		</div>
	);
}
