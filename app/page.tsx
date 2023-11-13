'use client';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import Select, { ActionMeta, InputActionMeta, SingleValue } from 'react-select';

export default function Home() {
  
  const [location, setLocation] = useState({
    searchTerm: '',
    options: []
  });

  const key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;
  const limit = 3;

  const geoFetcher = (url: string) => axios.get(url).then(res => res.data);
  
  const {data, isLoading, error } = useSWR(
    `http://api.openweathermap.org/geo/1.0/direct?q=${"reno"}&limit=${limit}&appid=${key}`,
    geoFetcher
  );

  const onLocationChange = (newValue: string, actionMeta: InputActionMeta) => {
    setLocation({...location, searchTerm: newValue});

  }

  return (
    <main>
      <div>
        <h1>Hello world</h1>
      </div>
      <Select isSearchable={true} options={location.options} inputValue={location.searchTerm} onInputChange={onLocationChange}></Select>
    </main>
  )
}