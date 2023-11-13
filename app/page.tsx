'use client';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import Select, { ActionMeta, InputActionMeta, SingleValue } from 'react-select';

export default function Home() {
  const locationQueryLimit = 5;
  const key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;

  const [location, setLocation] = useState({
    searchTerm: '',
    options: []
  });

  const onLocationChange = (newValue: string, actionMeta: InputActionMeta) => {

    setLocation({...location, searchTerm: newValue});
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${newValue}&limit=${locationQueryLimit}&appid=${key}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => {
      const options = data.data.map((location: any) => {
        return {label: location.city, value: location}
      })
      setLocation({...location, options: options});
    });
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