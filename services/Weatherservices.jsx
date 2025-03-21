import React from 'react';
import { useSearchParams } from 'expo-router/build/hooks';

API_Key = "dc764666f1bd7d701e63ecd7a7950769";
API_URL = "https://api.openweathermap.org/data/2.5/";

 export default function getWeatherData (infoType, useSearchParams) {
    const url = new URL(API_URL + infoType);
    url.searchParams.append({...useSearchParams, "appid": API_Key});

    return fetch( url)
        .then((response) => response.json())
        .then((data) => {
            return data;
    })
};
