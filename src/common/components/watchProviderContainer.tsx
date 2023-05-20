import Image from 'next/image';
import { WatchProviderCountry } from "../types/watchProvider"

type Props ={
    watchProvider: WatchProviderCountry
}

export default function WatchProviderContainer(props: Props) {    
    return (
        <div className='bg-gray-500'>
            {
                props.watchProvider.flatrate && (
                    <div>
                        {props.watchProvider.flatrate?.map((flatrate) => (                                   
                            <div key={`flatrate${flatrate.provider_id}`}  className="flex w-full pl-2 text-left">
                                <h3>Mirala en {flatrate.provider_name} {flatrate.urlService}</h3>
                                <Image className="thumbIMGBorder" 
                                                src={`${process.env.THEMOVIEDB_BASE_URL}original/${flatrate.logo_path}`} 
                                                width={80}
                                                height={80}
                                                style={{objectFit: 'cover',}} 
                                                alt={flatrate.provider_name}/>
                            </div>                                                                            
                        ))}
                    </div>
                )
            }
            
            {
                props.watchProvider.rent && (
                    <div>
                        {props.watchProvider.rent?.map((rent) => (                                   
                            <div key={`rent${rent.provider_id}`} className="flex w-full pl-2 text-left">
                                <h3>Alquilala en {rent.provider_name} {rent.urlService}</h3>
                                <Image className="thumbIMGBorder" 
                                                src={`${process.env.THEMOVIEDB_BASE_URL}original/${rent.logo_path}`} 
                                                width={80}
                                                height={80}
                                                style={{objectFit: 'cover',}} 
                                                alt={rent.provider_name}/>
                            </div>                        
                        ))}
                    </div>
                )
            }

            {
                props.watchProvider.buy && (
                    <div>
                        {props.watchProvider.buy?.map((buy) => (                                   
                            <div key={`buy${buy.provider_id}`} className="flex w-full pl-2 text-left">
                                <h3>Comprala en {buy.provider_name} {buy.urlService}</h3>
                                <Image className="thumbIMGBorder" 
                                                src={`${process.env.THEMOVIEDB_BASE_URL}original/${buy.logo_path}`} 
                                                width={80}
                                                height={80}
                                                style={{objectFit: 'cover',}} 
                                                alt={buy.provider_name}/>
                            </div>                                                                        
                       ))}
                    </div>
                )                    
            }
        </div>
        
    )
}