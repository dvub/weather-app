'use client';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import Select, { ActionMeta, InputActionMeta, SingleValue } from 'react-select';
import useLocation from './hooks/useLocation';

export default function Home() {
  
  const [location, setLocation] = useState({
    searchTerm: '',
    options: []
  });

  const onLocationChange = (newValue: string, actionMeta: InputActionMeta) => {
    setLocation({...location, searchTerm: newValue});
    useLocation(newValue)
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