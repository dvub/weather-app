import { WeatherAPIResponse } from '@/types';

export default function WindDisplay(props: { weather: WeatherAPIResponse }) {
	const { weather } = props;

	return (
		<div className='wind w-full border-gray-200 border-2 rounded-md p-3'>
			<h3 className='text-2xl border-b-2 border-gray-200'>Wind</h3>
			<p>{Math.ceil(weather.wind.speed)} mph</p>
			{weather.wind.gust && (
				<p>Gusts of {Math.ceil(weather.wind.gust)} mph</p>
			)}
		</div>
	);
}
