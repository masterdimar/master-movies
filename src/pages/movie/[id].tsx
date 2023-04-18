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
      <div className="bg-gray-400 relative h-screen">
        <Image src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.movie.backdrop_path}`} 
          fill
          priority
          style={{objectFit: 'cover',}} 
          alt={props.movie.title}/>
        <div className='flex place-content-between backdrop-brightness-50 bg-blue-600/5 flex-col w-full h-full'> 
          <section>
            <h2 className="text-white text-4xl text-left ml-4">PELICULA</h2>
            <h1 className="text-white text-7xl text-left font-extrabold ml-4">{`${props.movie.title.toUpperCase()}`}</h1>
            <h3 className="text-white text-2xl text-left ml-4">{genres}</h3>
            <h4 className="text-white text-lg text-left ml-4">{`${props.movie.release_date.split("-")[0]} | ${props.movie.runtime} min`}</h4>  
            <div className="pt-8 w-[20rem] sm:w-[25rem] md:w-[35rem]">
              <h4 className="text-white text-md text-left ml-4">{props.movie.overview}</h4>
            </div>
            <h4 className="text-white text-md text-left ml-4 pt-6">{`Protagonista: ${cast}`}</h4>
          </section>          
        </div>
      </div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
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
