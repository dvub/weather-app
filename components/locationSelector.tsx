import axios from 'axios';
import React from 'react';
import Select, { ActionMeta, InputActionMeta } from 'react-select';

export default function LocationSelector(props: { setCoordinates: any }) {
	const [location, setLocation] = React.useState({
		searchTerm: '',
		options: [],
	});
	const searchRef = React.useRef<string>('');
	let selectRef: React.RefObject<Select> = React.createRef();

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
			.get(`${endpoint}?q=${query}&limit=${queryLimit}&appid=${key}`)
			.then((response) => {
				console.log(response.data);
				const options = response.data.map((location: any) => {
					return {
						label: `${location.name}, ${location.state}`,
						value: location,
					};
				});
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

	const onLocationChange = (
		newValue: null,
		actionMeta: ActionMeta<never>
	) => {};
	return (
		<Select
			isSearchable={true}
			options={location.options}
			inputValue={searchRef.current}
			onInputChange={onSearchChange}
			placeholder={'Type a location to search...'}
			onChange={onLocationChange}
			loadingMessage={() => 'loading'}
			ref={(_) => selectRef}
		></Select>
	);
}
