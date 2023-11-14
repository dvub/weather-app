'use client'
import LocationSelector from '@/components/locationSelector'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import Select, { InputActionMeta } from 'react-select'

export default function Home() {
	const [coordinates, setCoordinates] = React.useState({
		latitude: 0,
		longitude: 0,
	})
	// whenever the LocationSelector componenet updates the coordinates,
	// we will run this code - this should make an API request now that we have the coords
	//
	React.useEffect(() => {
		console.log(coordinates)
		getWeatherData(coordinates.latitude, coordinates.longitude)
	}, [coordinates])
	const endpoint = process.env.NEXT_PUBLIC_WEATHER_ENDPOINT
	const key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY
	const getWeatherData = (latitude: number, longitude: number) => {
		axios
			.get(`${endpoint}?lat=${latitude}&lon=${longitude}&appid=${key}`)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<main>
			<div>
				<h1>Hello world</h1>
			</div>
			<LocationSelector setCoordinates={setCoordinates} />
		</main>
	)
}
