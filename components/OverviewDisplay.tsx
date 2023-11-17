import { kelvinToFahrenheit } from '@/lib/conversion';
import { WeatherAPIResponse } from '@/types';

export default function OverviewDisplay(props: {
	weather: WeatherAPIResponse;
}) {
	const { weather } = props;
	const temp = kelvinToFahrenheit(weather.main.temp) + '° F';
	return (
		<div className='panel overview'>
			<h1 className='text-5xl'>{weather.name}</h1>
			<h2 className='text-3xl'>{temp}</h2>
			<p className='text-xl'>{weather.weather[0].main}</p>
		</div>
	);
}
