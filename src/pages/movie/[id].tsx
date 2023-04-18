import { Genre, Credit, Cast, TMDBMovie } from "@/common/types/tmdbMovie"
import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext } from "next"

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
          <div className="flex relative h-60 sm:h-96 md:h-[30rem] lg:h-[35rem] xl:h-[720px] 2xl:h-[864px] 3xl:h-[1080px] items-center">
            <Image src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.movie.backdrop_path}`} 
              fill
              priority
              placeholder='blur'
              blurDataURL={`/_next/image?url=${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.movie.backdrop_path}&w=16&q=1`} 
              style={{objectFit: 'cover', objectPosition: 'center top'}} 
              alt={props.movie.title}/>
            <div className="backdrop-brightness-50 bg-blue-600/5 w-full h-full p-3 sm:p-20 flex items-center">
              <section className="text-left text-white w-full">
                <div className="">
                  <h3 className="text-md sm:text-lg uppercase">Película</h3>
                </div>
                <div className="">
                  <h1 className="font-extrabold text-2xl sm:text-5xl uppercase">{props.movie.title}</h1>
                </div>
                <div className="pt-2">
                  <h3 className="text.md sm:text-lg text-gray-400">{genres}</h3>
                </div>                
                <div className="text-md sm:text-lg text-gray-400">{`${props.movie.release_date.split("-")[0]} | ${props.movie.runtime} min`}</div>
                <div className="hidden md:visible">
                  <div className="pt-10 w-[300px] md:w-[600px] lg:w-[700px]">
                    <h2 className="text-lg sm:text-lg lg:text-2xl">{props.movie.overview}</h2>
                  </div>
                  <div className="pt-7"><span className="text-lg text-gray-400">Protagonistas: </span><span className="text-lg">{cast}</span></div>
                </div>
              </section>
            </div>
          </div>
          <div className="visible sm:hidden bg-gray-600 text-white">
            <div className="pt-10 text-left">
              <h2 className="text-lg sm:text-lg lg:text-2xl">{props.movie.overview}</h2>
            </div>
            <div className="pt-7 text-left"><span className="text-lg text-gray-400">Protagonistas: </span><span className="text-lg">{cast}</span></div>
          </div>      
      </main>     
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {  
  const language: string = context.query?.language?.toString() || "en-US"

  const movie: TMDBMovie = await fetch(`${process.env.THEMOVIEDB_API_URL}/movie/${context.params?.id}?api_key=${process.env.THEMOVIEDB_API_KEY}&language=${language}&append_to_response=credits`).then((x) => x.json());
  
  context.res.setHeader('Cache-control', `public, s-maxage=432000, max-age=432000, stale-while-revalidate=59`);
  return {
      props: {
        movie: movie,
        language: `${language}-${context.params?.country}`
      }
  }
}
