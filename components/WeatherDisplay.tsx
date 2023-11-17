import { WeatherAPIResponse } from '@/types';
import React from 'react';
import LocalTimeDisplay from './LocalTimeDisplay';
import WindDisplay from './WindDisplay';
import MiscDisplay from './MiscDisplay';
import OverviewDisplay from './OverviewDisplay';

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

	const date = new Date();
	const msTime = date.getTime() + date.getTimezoneOffset() * 60000;
	const sunrise = parseInt(weather.sys.sunrise) * 1000;
	const sunset = parseInt(weather.sys.sunset) * 1000;

	return (
		<div className='m-5 p-5 border-gray-300 border-2 rounded-md'>
			{msTime < sunset && msTime > sunrise ? 'day' : 'night'}
			<br />
			{msTime}
			<br />
			{sunset}
			<OverviewDisplay weather={weather} />
			<div className='mt-5 other flex gap-3'>
				<WindDisplay weather={weather} />
				<LocalTimeDisplay weather={weather} />
				<MiscDisplay weather={weather} />
			</div>
		</div>
	);
}
