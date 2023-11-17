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
	const msTime = Date.now() + weather.timezone * 1000;
	const msSunrise = parseInt(weather.sys.sunrise) * 1000;
	const msSunset = parseInt(weather.sys.sunset) * 1000;

	return (
		<div className='m-5 p-5 border-gray-300 border-2 rounded-md'>
			<OverviewDisplay weather={weather} />
			<div className='mt-5 other flex gap-3'>
				<WindDisplay weather={weather} />
				<LocalTimeDisplay weather={weather} />
				<MiscDisplay weather={weather} />
				{msTime > msSunset ? 'true' : 'false'}
			</div>
		</div>
	);
}
