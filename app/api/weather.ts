import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const key = process.env.OPENWEATHERMAP_KEY;
    const limit = 3;
    const query = req.body.city;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${key}`;
    axios.get(url).then(response => {
        res.status(200).json(response)
    });   
}