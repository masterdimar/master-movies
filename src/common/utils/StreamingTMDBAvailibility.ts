import { StreamingAvailability } from "../types/streamingAvailability";
import { WatchProviderCountry } from "../types/watchProvider";
import StreamingAvailabilityData from '../../../public/json/streamingAvailability.json';

export default async function StreamingTBDMAvailibityUnion(country: string, watchProviderCountry:  WatchProviderCountry, streamingAvailibilityInfo: StreamingAvailability){
    watchProviderCountry.flatrate?.map((flatrate, index) => {        
        const data = StreamingAvailabilityData.providers.find((data) => data.TMDBProviderID == flatrate.provider_id)
        if(data){
            if(streamingAvailibilityInfo.result.streamingInfo[country.toLowerCase()] !== undefined && streamingAvailibilityInfo.result.streamingInfo[country.toLowerCase()][data.StreamingAvailibilityProviderID] != undefined){                
                flatrate.urlService = streamingAvailibilityInfo.result.streamingInfo[country.toLowerCase()][data.StreamingAvailibilityProviderID][0].link
            }            
            return
        }
    })
    
    watchProviderCountry.rent?.map((rent, index) => {        
        const data = StreamingAvailabilityData.providers.find((data) => data.TMDBProviderID == rent.provider_id)
        if(data){
            if(streamingAvailibilityInfo.result.streamingInfo[country.toLowerCase()] !== undefined && streamingAvailibilityInfo.result.streamingInfo[country.toLowerCase()][data.StreamingAvailibilityProviderID] != undefined){                
                rent.urlService = streamingAvailibilityInfo.result.streamingInfo[country.toLowerCase()][data.StreamingAvailibilityProviderID][0].link
            }            
            return
        }
    })

    watchProviderCountry.buy?.map((buy, index) => {        
        const data = StreamingAvailabilityData.providers.find((data) => data.TMDBProviderID == buy.provider_id)
        if(data){
            if(streamingAvailibilityInfo.result.streamingInfo[country.toLowerCase()] !== undefined && streamingAvailibilityInfo.result.streamingInfo[country.toLowerCase()][data.StreamingAvailibilityProviderID] != undefined){                
                buy.urlService = streamingAvailibilityInfo.result.streamingInfo[country.toLowerCase()][data.StreamingAvailibilityProviderID][0].link
            }            
            return
        }
    })
}