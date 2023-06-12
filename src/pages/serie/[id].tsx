import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { TMDBSerie } from "@/common/types/tmdbSerie"
import { Cast } from "@/common/types/cast";
import { Genre } from "@/common/types/genre";
import WatchProviderContainer from '@/common/components/watchProviderContainer';
import { Provider } from '@/common/types/provider';
import GetStreamingAvailability from '@/common/utils/StreamingAvailability';
import { StreamingAvailability } from '@/common/types/streamingAvailability';
import StreamingTBDMAvailibityUnion from '@/common/utils/StreamingTMDBAvailibility';


type Props ={
  serie: TMDBSerie,
  language: string
}
 export default function Serie(props: Props) {
  const imageSizes: string = '(max-width: 250px) 100vw, (max-width: 500px) 50vw, (max-width: 999px) 20vw, 10vw'

  let genres : string = ""
  props.serie.genres.map((genre: Genre) => {
    if(genres == "")
      genres = genre.name
    else
      genres = `${genres}, ${genre.name}`
  })

  let cast: string = ""
  const actors: Cast[] | undefined = props.serie.credits?.cast.filter(cast => cast.known_for_department == "Acting").sort(cast => cast.order).slice(0,3)
  
  actors?.map((actor: Cast) =>{
    if(cast == "")
      cast = actor.original_name
    else
      cast = `${cast}, ${actor.original_name}`
  })

  return (
    <>       
      <main>

          <div className="mainIMG">
            <Image src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.serie.backdrop_path}`} 
                fill
                style={{objectFit: 'cover', objectPosition: 'center top'}} 
                alt={props.serie.name}/>
            <div className='gradientOverIMG'></div>
            <div className="bgBackdrop">
              <span className="sectionGral">
                  <div className="titTipo">Serie</div>
                
                  <div className="">
                    <h1 className="titID">{props.serie.name}</h1>
                    <h2 className='sectionGral'>Titulo Original: {props.serie.original_name}</h2>
                  </div>

                  <div className="pt-2">
                    <h3 className="textoID">{genres}</h3>
                    <div className="textoID">{`${props.serie.first_air_date.split("-")[0]} - ${props.serie.last_air_date.split("-")[0]} | ${props.serie.number_of_seasons} temporadas`}</div>
                  </div>

                
                
                <div className="md:flex sm:flex-line">
                  <div className=''>
                      <div className="thumbID">
                        <Image className="thumbIMGBorder" 
                            src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD}${props.serie.poster_path}`} 
                            fill
                            blurDataURL={`/_next/image?url=${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD_MIN}${props.serie.poster_path}&w=16&q=1`} 
                            style={{objectFit: 'cover',}} 
                            sizes={imageSizes} alt={props.serie.name}/>    
                      </div>
                  </div>
                  <div className=''> 
                    <div className="descripcionID">
                        <span>{props.serie.overview}</span>
                        <div className="pt-4">
                          <span className="textoResaltado">Protagonistas: </span>
                          <span>{cast}</span>
                        </div>
                        <div>
                          <span><span className="textoResaltado">Puntaje: </span> {Math.round(props.serie.vote_average * 10) / 10}</span>
                        </div>
                        <div>
                            {
                              props.serie['watch/providers']?.watchProviderCountry &&(
                                <WatchProviderContainer watchProvider={props.serie['watch/providers'].watchProviderCountry}/>
                              )
                            }  
                        </div> 
                  </div>
                  </div>

                </div>
              </span>
            </div>
          </div>

      </main>     
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {  
  const language: string = context.query?.language?.toString() || "en-US"
  const country: string = language.split("-")[1]

  const serie: TMDBSerie = await fetch(`${process.env.THEMOVIEDB_API_URL}/tv/${context.params?.id}?api_key=${process.env.THEMOVIEDB_API_KEY}&language=${language}&append_to_response=credits,watch/providers`).then((x) => x.json());
  
  if(serie['watch/providers'] && serie['watch/providers']?.results[country] !== undefined){
    serie['watch/providers'].watchProviderCountry = { rent: serie['watch/providers']?.results[country].rent || null, buy: serie['watch/providers']?.results[country].buy || null, flatrate: serie['watch/providers']?.results[country].flatrate.filter((rent: Provider) => rent.provider_id != 1796) || null}
    const streamingInfo: StreamingAvailability | undefined = await GetStreamingAvailability(country, `movie/${context.params?.id}`)
    
    if(streamingInfo)
      await StreamingTBDMAvailibityUnion(country, serie['watch/providers'].watchProviderCountry, streamingInfo)    
  }  

  context.res.setHeader('Cache-control', `public, s-maxage=432000, max-age=432000, stale-while-revalidate=59`);
  return {
      props: {
        serie: serie,
        language: `${language}-${context.params?.country}`
      }
  }
}
