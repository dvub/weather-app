import { kelvinToFahrenheit } from '@/lib/conversion'
import { WeatherAPIResponse } from '@/types'
import { checkServerIdentity } from 'tls'

export default function WeatherDisplay(props: {
	weather: WeatherAPIResponse | undefined
}) {
	const { weather } = props
	if (weather === undefined) {
		return (
			<div>
				<p>No weather found :\</p>
			</div>
		)
	}
	const sunriseDate = new Date(Number.parseInt(weather.sys.sunrise) * 1000)
	const sunsetDate = new Date(Number.parseInt(weather.sys.sunset) * 1000)
	return (
		<div className='m-5 w-full'>
			<div className='overview text-center'>
				<h1 className='text-5xl'>{weather.name}</h1>
				<h2 className='text-3xl'>
					{kelvinToFahrenheit(weather.main.temp)}° F
				</h2>
				<p className='text-xl'>{weather.weather[0].main}</p>
			</div>
			<div className='other flex w-full'>
				<div className='wind w-full'>
					<h3 className='text-2xl'>Wind</h3>
					<p>{Math.ceil(weather.wind.speed)} mph</p>
					<p>Gusts of {Math.ceil(weather.wind.gust)} mph</p>
				</div>
				<div className='misc w-full'>
					<p>Humidity: {weather.main.humidity}%</p>
				</div>
				<div></div>
			</div>
		</div>
	)
}
