import { StreamingAvailability } from "../types/streamingAvailability";

export default async function GetStreamingAvailability(country: string, tmdb_id: string){
    let streamingAvailability: StreamingAvailability | undefined = undefined
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': 'f7bc1d5bc2msheade4612a7876edp1445bcjsn41c448d398fc',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    
    try{
    const response = await fetch(`https://streaming-availability.p.rapidapi.com/v2/get/basic?country=${country}&tmdb_id=${tmdb_id}`, options)
    if(response.ok)
         streamingAvailability = await response.json()
    else
        console.error(await response.json())
    }
    catch(error){
        console.error(error)
    }
    return streamingAvailability
}