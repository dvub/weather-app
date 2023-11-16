import { WeatherAPIResponse } from '@/types';

export default function WindDisplay(props: { weather: WeatherAPIResponse }) {
	const { weather } = props;

	return (
		<div className='wind w-full'>
			<h3 className='text-2xl'>Wind</h3>
			<p>{Math.ceil(weather.wind.speed)} mph</p>
			{weather.wind.gust && (
				<p>Gusts of {Math.ceil(weather.wind.gust)} mph</p>
			)}
		</div>
	);
}
