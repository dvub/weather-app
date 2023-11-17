import { WeatherAPIResponse } from '@/types';

export default function MiscDisplay(props: { weather: WeatherAPIResponse }) {
	const { weather } = props;
	return (
		<div className='misc w-full border-gray-200 border-2 rounded-md p-3'>
			<h3 className='text-2xl text-2xl border-b-2 border-gray-200'>
				Other
			</h3>
			<p>Humidity: {weather.main.humidity}%</p>
			<p></p>
		</div>
	);
}
