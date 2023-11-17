import { WeatherAPIResponse } from '@/types';

export default function WindDisplay(props: { weather: WeatherAPIResponse }) {
	const { weather } = props;

	return (
		<div className='panel wind'>
			<h3>Wind</h3>
			<p>{Math.ceil(weather.wind.speed)} mph</p>
			{weather.wind.gust && (
				<p>Gusts of {Math.ceil(weather.wind.gust)} mph</p>
			)}
		</div>
	);
}
