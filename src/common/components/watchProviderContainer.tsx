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
                    <div className='pt-8'>
                        <div className='flex items-center justify-center bgWatchIcons'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>

                            <span className='titTipo pl-2'>Mirala en: </span>
                        </div>
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

                                    </div>                                                                            
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
            
            {
                props.watchProvider.rent && (
                    <div className='pt-8'>
                        <div className='flex items-center justify-center bgWatchIcons'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                        </svg>

                            <span className='titTipo pl-2'>
                                Alquilala en:</span>
                        </div>
                        
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
                                        </div>  
                                                         
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }

            {
                props.watchProvider.buy && (
                    <div className='pt-8'>
                        <div className='flex items-center justify-center bgWatchIcons'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
                            </svg>

                            <span className='titTipo pl-2'>Comprala en:</span>
                        </div>
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