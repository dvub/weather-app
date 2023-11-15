import { kelvinToFahrenheit } from '@/lib/conversion'
import { WeatherAPIResponse } from '@/types'

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

	return (
		<div>
			<h2>{kelvinToFahrenheit(weather.main.temp)}</h2>
			<p>{weather.weather[0].main}</p>
			<p>{weather.clouds.all}</p>
		</div>
	)
}
