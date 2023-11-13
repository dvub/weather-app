'use client';
import axios from 'axios';
import { useState } from 'react';
import Select, { InputActionMeta } from 'react-select';

export default function Home() {
  
  const [location, setLocation] = useState({
    searchTerm: '',
    options: []
  });

    
  const key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;
  const limit = 3;

  const onLocationChange = (newValue: string, actionMeta: InputActionMeta) => {
    if (!newValue) {
      setLocation({ ...location, options: [] });
      return;
    }
    setLocation({...location, searchTerm: newValue});
    setTimeout(() => {
      
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${newValue}&limit=${limit}&appid=${key}`)
      .then(response => {
        console.log(response.data)
        const options = response.data.map((location: any) => {
          return {label: `${location.name}, ${location.state}`, value: location}
        });
        setLocation({...location, options: options});
      }).catch((err) => {
        console.log(err);
      });
  

    }, 3000);
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