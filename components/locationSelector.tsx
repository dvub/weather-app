import { GeocodeAPIResponse } from '@/types';
import axios from 'axios';
import React from 'react';
import Select, { ActionMeta, InputActionMeta } from 'react-select';

export default function LocationSelector(props: {
	setCoordinates: React.Dispatch<
		React.SetStateAction<
			{ latitude: number; longitude: number } | undefined
		>
	>;
}) {
	const [location, setLocation] = React.useState({
		searchTerm: '',
		options: [],
	});
	const searchRef = React.useRef<string>('');
	React.useEffect(() => {
		const getDataTimeout = setTimeout(() => {
			updateLocationOptions(searchRef.current);
		}, debounceTimeout);

		return () => clearTimeout(getDataTimeout);
	}, [location.searchTerm]);

	// get stuff from env variables about our api
	const key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;
	const endpoint = process.env.NEXT_PUBLIC_GEO_ENDPOINT;
	const queryLimit = 3;
	// minimum time for each location option update
	// this might get rate-limited at a certain timeout, so this won't really do much
	const debounceTimeout = 500;

	const updateLocationOptions = (query: string) => {
		// don't make an empty query
		if (!query) return;
		// use axios to make a get request to the endpoint
		axios
			.get(
				`${endpoint}?q=${query}&limit=${queryLimit}&units=${'imperial'}&appid=${key}`
			)
			.then((response) => {
				const options = response.data.map(
					(location: GeocodeAPIResponse) => {
						return {
							label: `${location.name}, ${location.state}`,
							value: location,
						};
					}
				);
				setLocation({ ...location, options: options });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onSearchChange = (newValue: string, actionMeta: InputActionMeta) => {
		searchRef.current = newValue;
		setLocation({ ...location, searchTerm: newValue });
	};

	const onLocationChange = (newValue: any, actionMeta: ActionMeta<never>) => {
		const { lat, lon } = newValue.value;
		props.setCoordinates({
			latitude: lat,
			longitude: lon,
		});
	};
	return (
		<div className='wrapper flex justify-center m-5'>
			<Select
				className='w-[50%] text-center'
				isSearchable={true}
				options={location.options}
				inputValue={searchRef.current}
				onInputChange={onSearchChange}
				placeholder={'Type a location to search...'}
				onChange={onLocationChange}></Select>
		</div>
	);
}
