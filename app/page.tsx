'use client';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import Select, { ActionMeta, SingleValue } from 'react-select';

export default function Home() {
  
  const [location, setLocation] = useState({
    searchTerm: '',
    options: []
  });

  const key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;
  const limit = 3;

  const geoFetcher = (url: string) => axios.get(url).then(res => res.data)


  const onLocationChange = (newValue: SingleValue<string>, actionMeta: ActionMeta<string>) => {
    const { data: locationData, error: locationError, isLoading: locationIsLoading } = useSWR(
      `http://api.openweathermap.org/geo/1.0/direct?q=${"london"}&limit=${limit}&appid=${key}`,
      geoFetcher
    );
    

  }

  return (
    <main>
      <div>
        <h1>Hello world</h1>
      </div>
      <Select isSearchable={true} value={location.searchTerm} onChange={onLocationChange}></Select>
    </main>
  )
}