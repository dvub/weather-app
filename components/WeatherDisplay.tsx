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
	const msTime = date.getTime();
	const sunrise = new Date(parseInt(weather.sys.sunrise) * 1000).getTime();
	const sunset = new Date(parseInt(weather.sys.sunset) * 1000).getTime();

	const variant = 1;

	return (
		<div
			className={`sky-gradient-${variant} m-5 p-5 border-gray-300 border-2 rounded-md`}>
			<OverviewDisplay weather={weather} />
			<div className='mt-5 other flex gap-3'>
				<WindDisplay weather={weather} />
				<LocalTimeDisplay weather={weather} />
				<MiscDisplay weather={weather} />
			</div>
		</div>
	);
}
