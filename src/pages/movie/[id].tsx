import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { TMDBMovie } from "@/common/types/tmdbMovie"
import { Cast } from "@/common/types/cast";
import { Genre } from "@/common/types/genre";
import WatchProviderContainer from '@/common/components/watchProviderContainer';
import { Provider } from '@/common/types/provider';
import { StreamingAvailability } from '@/common/types/streamingAvailability';
import GetStreamingAvailability from '@/common/utils/StreamingAvailability';
import StreamingTBDMAvailibityUnion from '@/common/utils/StreamingTMDBAvailibility';

type Props ={
  movie: TMDBMovie,
  language: string
}
 export default function Movie(props: Props) {
  let genres : string = ""
  props.movie.genres.map((genre: Genre) => {
    if(genres == "")
      genres = genre.name
    else
      genres = `${genres}, ${genre.name}`
  })

  let cast: string = ""
  const actors: Cast[] | undefined = props.movie.credits?.cast.filter(cast => cast.known_for_department == "Acting").sort(cast => cast.order).slice(0,3)
  
  actors?.map((actor: Cast) =>{
    if(cast == "")
      cast = actor.original_name
    else
      cast = `${cast}, ${actor.original_name}`
  })

  return (
    <>       
      <main>
          <div className="flex relative h-60 sm:h-96 md:h-[30rem] lg:h-[35rem] xl:h-[720px] 2xl:h-[864px] 3xl:h-[1080px] items-center bg-blue-900">
            <Image src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.movie.backdrop_path}`} 
              fill
              priority
              placeholder='blur'
              blurDataURL={`/_next/image?url=${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.movie.backdrop_path}&w=16&q=1`} 
              style={{objectFit: 'cover', objectPosition: 'center top'}} 
              alt={props.movie.title}/>
            <div className="backdrop-brightness-50 bg-blue-600/5 w-full h-full p-3 sm:p-10 md:p-20 flex items-center">
              <section className="text-left text-white w-full">
                <div className="">
                  <h3 className="text-md sm:text-lg uppercase">Película</h3>
                </div>
                <div className="">
                  <h1 className="font-extrabold text-2xl sm:text-5xl uppercase">{props.movie.title}</h1>
                </div>
                <div className="pt-2">
                  <h3 className="text.md sm:text-lg text-gray-200">{genres}</h3>
                </div>                
                <div className="text-md sm:text-lg text-gray-200">{`${props.movie.release_date.split("-")[0]} | ${props.movie.runtime} min`}</div>
                <div className="hidden md:block pt-10">
                  <div className="w-[300px] md:w-[600px] lg:w-[700px] 2xl:w-[1200px] 3xl:w-[1500px] max-h-20 lg:max-h-56 2xl:max-h-64 overflow-y-auto text-justify ">
                    <h2 className="text-lg sm:text-lg lg:text-2xl">{props.movie.overview}</h2>
                  </div>
                  <div className="pt-7"><span className="text-lg text-gray-400">Protagonistas: </span><span className="text-lg">{cast}</span></div>
                </div>
              </section>
            </div>
          </div>
          <div className="visible md:hidden bg-gray-600 text-white">
            <div className="pt-10 text-left">
              <h2 className="text-lg sm:text-lg lg:text-2xl text-justify">{props.movie.overview}</h2>
            </div>
            <div className="pt-7 text-left"><span className="text-lg text-gray-400">Protagonistas: </span><span className="text-lg">{cast}</span></div>
          </div>   
          {
            props.movie['watch/providers']?.watchProviderCountry &&(
              <WatchProviderContainer watchProvider={props.movie['watch/providers'].watchProviderCountry}/>
            )
          }          
      </main>     
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {  
  const language: string = context.query?.language?.toString() || "en-US"
  const country: string = language.split("-")[1]

  const movie: TMDBMovie = await fetch(`${process.env.THEMOVIEDB_API_URL}/movie/${context.params?.id}?api_key=${process.env.THEMOVIEDB_API_KEY}&language=${language}&append_to_response=credits,watch/providers`).then((x) => x.json());
  
  if(movie['watch/providers'] && movie['watch/providers']?.results[country] !== undefined){
    movie['watch/providers'].watchProviderCountry = { rent: movie['watch/providers']?.results[country].rent?.filter((rent: Provider) => rent.provider_id != 192) || null, buy: movie['watch/providers']?.results[country].buy?.filter((buy: Provider) => buy.provider_id != 192) || null, flatrate: movie['watch/providers']?.results[country].flatrate.filter((buy: Provider) => buy.provider_id != 1796) || null}
    const streamingInfo: StreamingAvailability | undefined = await GetStreamingAvailability(country, `movie/${context.params?.id}`)
    
    if(streamingInfo)
      await StreamingTBDMAvailibityUnion(country, movie['watch/providers'].watchProviderCountry, streamingInfo)    
  }  

  context.res.setHeader('Cache-control', `public, s-maxage=432000, max-age=432000, stale-while-revalidate=59`);
  return {
      props: {
        movie: movie,
        language: language
      }
  }
}
