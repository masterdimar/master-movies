import Image from 'next/image';
import { WatchProviderCountry } from "../types/watchProvider"

type Props ={
    watchProvider: WatchProviderCountry
}

export default function WatchProviderContainer(props: Props) {    
    return (
        <div>
            {
                props.watchProvider.flatrate && (
                    <div className='pt-10'>
                        <span className='titTipo'>Mirala en: </span>
                        <div className='relative flex items-center'>
                            <div className='flex-1 contenedorThumbsSt'>
                                {props.watchProvider.flatrate?.map((flatrate) => (                                   
                                    <div key={`flatrate${flatrate.provider_id}`}>
                                        <div className='imgThumbStreaming'>
                                            <Image className="borderThumbStreaming" 
                                                        src={`${process.env.THEMOVIEDB_BASE_URL}original/${flatrate.logo_path}`} 
                                                        width={70}
                                                        height={70}
                                                        style={{objectFit: 'cover',}} 
                                                        alt={flatrate.provider_name}/>
                                        </div>
                                        <span className='textoID text-center'>
                                            <h3>{flatrate.provider_name} {flatrate.urlService}</h3>
                                        </span>
                                    </div>                                                                            
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
            
            {
                props.watchProvider.rent && (
                    <div className='pt-10'>
                        <span className='titTipo'>Alquilala en:</span>
                        <div className='relative flex items-center'>
                            <div className='flex-1 contenedorThumbsSt'>
                                {props.watchProvider.rent?.map((rent) => (                                  
                                        <div key={`rent${rent.provider_id}`}>
                                            <div className='imgThumbStreaming'> 
                                                <Image className="borderThumbStreaming" 
                                                                src={`${process.env.THEMOVIEDB_BASE_URL}original/${rent.logo_path}`} 
                                                                width={70}
                                                                height={70}
                                                                style={{objectFit: 'cover',}} 
                                                                alt={rent.provider_name}/>
                                            </div>
                                            <span className='textoID text-center'>
                                                <h3>{rent.provider_name} {rent.urlService}</h3>
                                            </span>
                                        </div>  
                                                         
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }

            {
                props.watchProvider.buy && (
                    <div className='pt-10'>
                        <span className='titTipo'>Comprala en:</span>
                        <div className='relative flex items-center'>
                            <div className='flex-1 contenedorThumbsSt'>
                                {props.watchProvider.buy?.map((buy) => (                                  
                                        <div key={`buy${buy.provider_id}`}>
                                            <div className='imgThumbStreaming'>
                                                <Image className="borderThumbStreaming" 
                                                            src={`${process.env.THEMOVIEDB_BASE_URL}original/${buy.logo_path}`} 
                                                            width={70}
                                                            height={70}
                                                            style={{objectFit: 'cover',}} 
                                                            alt={buy.provider_name}/>
                                            </div>
                                            <span className='textoID text-center'>
                                                <h3>{buy.provider_name} {buy.urlService}</h3>
                                            </span>
                                        </div>                                                                        
                                ))}
                            </div>
                       </div>
                    </div>
                )                    
            }
        </div>
        
    )
}