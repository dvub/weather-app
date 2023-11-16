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

	return (
		<div className='w-full'>
			<OverviewDisplay weather={weather} />
			<div className='other flex justify-center align-middle w-full'>
				<WindDisplay weather={weather} />
				<LocalTimeDisplay weather={weather} />
				<MiscDisplay weather={weather} />
			</div>
		</div>
	);
}
