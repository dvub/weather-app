import { WeatherAPIResponse } from '@/types';

export default function MiscDisplay(props: { weather: WeatherAPIResponse }) {
	const { weather } = props;
	return (
		<div className='panel misc'>
			<h3>Other</h3>
			<p>Humidity: {weather.main.humidity}%</p>
			<p></p>
		</div>
	);
}
