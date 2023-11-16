import { kelvinToFahrenheit } from '@/lib/conversion';
import { WeatherAPIResponse } from '@/types';
import React from 'react';
import { checkServerIdentity } from 'tls';

export default function WeatherDisplay(props: {
	weather: WeatherAPIResponse | undefined;
}) {
	const { weather } = props;
	if (weather === undefined) {
		return (
			<div>
				<p>No weather found :\</p>
			</div>
		);
	}
	// https://stackoverflow.com/questions/63219753/how-to-show-time-and-date-in-realtime-in-react-js
	const [currentTime, setCurrentTime] = React.useState(new Date()); // Save the current date to be able to trigger an update

	React.useEffect(() => {
		const timer = setInterval(() => {
			// Creates an interval which will update the current data every minute
			// This will trigger a rerender every component that uses the useDate hook.
			setCurrentTime(new Date());
		}, 1000);
		return () => {
			clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
		};
	}, []);

	const temp = kelvinToFahrenheit(weather.main.temp) + '° F';
	// Calculate the time in the specified timezone
	const locationTime = new Date(
		currentTime.getMilliseconds() + weather.timezone * 1000
	);

	const hours = locationTime.getUTCHours() % 12;
	const minutes = locationTime.getUTCMinutes();
	const seconds = locationTime.getUTCSeconds();
	const timeString = `${hours}:${minutes}:${seconds}`;

	return (
		<div className='w-full text-center'>
			<div className='overview'>
				<h1 className='text-5xl'>{weather.name}</h1>
				<h2 className='text-3xl'>{temp}</h2>
				<p className='text-xl'>{weather.weather[0].main}</p>
			</div>
			<div className='other flex justify-center align-middle w-full'>
				<div className='wind w-full'>
					<h3 className='text-2xl'>Wind</h3>
					<p>{Math.ceil(weather.wind.speed)} mph</p>
					<p>Gusts of {Math.ceil(weather.wind.gust)} mph</p>
				</div>
				<div className='time w-full'>
					<h3 className='text-2xl'>Time</h3>
					<p>{timeString}</p>
				</div>
				<div className='misc w-full'>
					<h3 className='text-2xl'>Other</h3>
					<p>Humidity: {weather.main.humidity}%</p>
					<p></p>
				</div>
				<div></div>
			</div>
		</div>
	);
}
