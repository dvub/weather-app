import axios from "axios";
import useSWR from "swr"

export default function useLocation (query: string) {
    const geoFetcher = (url: string) => axios.get(url).then(res => res.data);
    const key = process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY;
    const limit = 3;
    
    const { data, error, isLoading } = useSWR(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${key}`, geoFetcher)
   
    return {
      data,
      isLoading,
      error
    }
  }