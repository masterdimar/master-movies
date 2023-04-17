import { TMDBMovie } from "@/common/types/tmdbMovie"
import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext } from "next"

type Props ={
  movie: TMDBMovie,
  language: string
}
 export default function Movie(props: Props) {
  return (
    <>      
      <p>Película: <span>{props.movie.title}</span></p>
      <p>Sinopsis: <span>{props.movie.overview}</span></p>
      <Image className="rounded-3xl" src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE}${props.movie.poster_path}`} width={500} height={500}  alt={props.movie.title}/>
      <Image className="rounded-3xl" src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.movie.backdrop_path}`} width={1280} height={500}  alt={props.movie.title}/>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {  
  const language: string = context.query?.language?.toString() || "en-US"

  const movie: TMDBMovie = await fetch(`${process.env.THEMOVIEDB_API_URL}/movie/${context.params?.id}?api_key=${process.env.THEMOVIEDB_API_KEY}&language=${language}-${context.params?.country}`).then((x) => x.json());
  context.res.setHeader('Cache-control', `public, s-maxage=432000, max-age=432000, stale-while-revalidate=59`);
  return {
      props: {
        movie: movie,
        language: `${language}-${context.params?.country}`
      }
  }
}
