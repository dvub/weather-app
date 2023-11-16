import { getFormattedLocalTime } from '@/lib/conversion';
import { WeatherAPIResponse } from '@/types';
import React from 'react';

export default function LocalTimeDisplay(props: {
	weather: WeatherAPIResponse;
}) {
	const { weather } = props;
	// https://stackoverflow.com/questions/63219753/how-to-show-time-and-date-in-realtime-in-react-js
	const [currentTime, setCurrentTime] = React.useState(Date.now()); // Save the current date to be able to trigger an update

	React.useEffect(() => {
		const timer = setInterval(() => {
			// Creates an interval which will update the current data every minute
			// This will trigger a rerender every component that uses the useDate hook.
			setCurrentTime(Date.now());
		}, 60000);
		return () => {
			clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
		};
	}, []);
	// the api i'm using sends responses in unix times
	// these are *seconds* since the epoch, and js works with MS since the epoch
	// so * 1000 to convert sec to ms
	const msOffset = weather.timezone * 1000;
	const msSunrise = parseInt(weather.sys.sunrise) * 1000;
	const msSunset = parseInt(weather.sys.sunset) * 1000;

	const time = getFormattedLocalTime(currentTime, msOffset);
	const sunrise = getFormattedLocalTime(msSunrise, msOffset);
	const sunset = getFormattedLocalTime(msSunset, msOffset);

	const dayLength = new Date(msSunset - msSunrise).getUTCHours();
	return (
		<div className='time w-full'>
			<h3 className='text-2xl'>Time</h3>
			<p>Current: {time}</p>
			<p>Sunrise: {sunrise}</p>
			<p>Sunset: {sunset}</p>
			<p>Day Length: {dayLength} Hours</p>
		</div>
	);
}
