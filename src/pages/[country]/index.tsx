import { TMDBDiscover } from '@/common/types/tmdbDiscover'
import { TMDBMovie } from '@/common/types/tmdbMovie';
import { TMDBSerie } from '@/common/types/tmdbSerie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import MovieContainer from '@/common/components/movieContainer';
import SerieContainer from '@/common/components/serieContainer';
import Image from 'next/image';

type Props ={
  movies: TMDBMovie[],
  series: TMDBSerie[],
  headerImage: string,
  country: string,
  language: string
}
 export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>MasterMovies</title>
        <meta name="description" content="Find all the movies and series in streaming platforms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <main>
        <div className='header'>
          <Image src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.headerImage}`} fill style={{objectFit: 'cover',}} alt=""/>
          <div className='flex place-content-between backdrop-brightness-50 bg-gray-950/40 flex-col items-center'> 
            <div className='headerText'>
              <span>Encuentra todas las Películas y Series en todas las plataformas</span>
            </div>              
            <div className='flex text-white h-full p-4 mt-5 w-4/5'>
                <div className='relative flex flex-1 flex-grow'>
                    <input type="text" className="inputSearch" placeholder="Search..."></input>
                    <div className="absolute inset-y-0 left-0 flex items-center px-3">
                      <span className='material-icons text-gray-950'>search</span>
                    </div>                              
                </div>                       
            </div>
          </div>
        </div>                            
        <h2>Películas populares</h2>
        <MovieContainer language={props.language} movies={props.movies}/>

        <h2>Series populares</h2>
        <SerieContainer language={props.language} series={props.series}/>               
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const language: string = context.query?.language?.toString() || "en"

  const randomMovieSerie: number = Math.floor(Math.random() * 2);
  var headerImage: string = ""

  const discoverMovies: TMDBDiscover = await fetch(`${process.env.THEMOVIEDB_API_URL}/discover/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&language=${language}&sort_by=popularity.desc&watch_region=${context.params?.country}&with_watch_monetization_types=flatrate`).then((x) => x.json());
  const discoverSeries: TMDBDiscover = await fetch(`${process.env.THEMOVIEDB_API_URL}/discover/tv?api_key=${process.env.THEMOVIEDB_API_KEY}&language=${language}&sort_by=popularity.desc&watch_region=${context.params?.country}&with_watch_monetization_types=flatrate`).then((x) => x.json());
   
  if(randomMovieSerie == 0){    
    const randomMovie: number = Math.floor(Math.random() * 20);    
    headerImage = `${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${discoverMovies.results[randomMovie].backdrop_path}`
  }

  if(randomMovieSerie == 1){
    const randomSerie: number = Math.floor(Math.random() * 20);  
    headerImage = `${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${discoverSeries.results[randomSerie].backdrop_path}`
  }   

  context.res.setHeader('Cache-control', `public, s-maxage=432000, max-age=432000, stale-while-revalidate=59`);
  return {
      props: {
        movies: discoverMovies.results,
        series: discoverSeries.results,
        headerImage: headerImage,
        country: context.params?.country,
        language: `${language}-${context.params?.country}`
      }
  }
}
