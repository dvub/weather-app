import { WeatherAPIResponse } from '@/types';

export default function MiscDisplay(props: { weather: WeatherAPIResponse }) {
	const { weather } = props;
	return (
		<div className='misc w-full'>
			<h3 className='text-2xl'>Other</h3>
			<p>Humidity: {weather.main.humidity}%</p>
			<p></p>
		</div>
	);
}
