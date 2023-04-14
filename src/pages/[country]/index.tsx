import { TMDBDiscover } from '@/common/types/tmdbDiscover'
import { TMDBMovie } from '@/common/types/tmdbMovie';
import { TMDBSerie } from '@/common/types/tmdbSerie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieContainer from '@/common/types/components/movieContainer';
import SerieContainer from '@/common/types/components/serieContainer';

type Props ={
  movies: TMDBMovie[],
  series: TMDBSerie[],
  headerImage: string,
  language: string
}
export default function Home(props: Props) {
  var settings = {
    dots: false,
		infinite: false,
		draggable: true,
		touchMove: true,
		swipeToSlide: true,
		touchThreshold: 50,
		slidesToShow: 5.5,
		slidesToScroll: 1,
		speed: 500,
		initialSlide: 0,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.5,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1.2,
        }
      },
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex h-72 md:h-96 lg:h-[25rem] justify-center items-center flex-col relative bg-gray-700'>
          <div className='w-full h-full bg-cover bg-center bg-gray-300'>
            <Image src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.headerImage}`} fill style={{objectFit: 'cover',}} alt=""/>
            <div className='flex justify-center backdrop-brightness-50 bg-blue-600/40 w-full h-full'>
              <span className='text-white text-2xl sm:text-4xl md:text-4xl lg:text-5xl text-left p-4 mt-3'>Bienvenido a MASTERMOVIES! <p className='p-4'/>Aquí escontrarás en qué plataformas puedes ver tus pelis y series favoritas</span>
            </div>
          </div>
        </div>

                       
        <h2 className='text-2xl pt-4'>Películas populares</h2>
        <MovieContainer movies={props.movies}/>

        <h2 className='text-2xl'>Series populares</h2>
        <SerieContainer series={props.series}/>
        
        
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const language: string = context.query?.language?.toString() || "en"

  const randomMovieSerie: number = Math.floor(Math.random() * 2);
  var headerBackImage: string = ""

  const discoverMovies: TMDBDiscover = await fetch(`${process.env.THEMOVIEDB_API_URL}/discover/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&language=${language}&sort_by=popularity.desc&watch_region=${context.params?.country}&with_watch_monetization_types=flatrate`).then((x) => x.json());
  const discoverSeries: TMDBDiscover = await fetch(`${process.env.THEMOVIEDB_API_URL}/discover/tv?api_key=${process.env.THEMOVIEDB_API_KEY}&language=${language}&sort_by=popularity.desc&watch_region=${context.params?.country}&with_watch_monetization_types=flatrate`).then((x) => x.json());
   
  if(randomMovieSerie == 0){    
    const randomMovie: number = Math.floor(Math.random() * 20);    
    headerBackImage = `${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${discoverMovies.results[randomMovie].backdrop_path}`
  }

  if(randomMovieSerie == 1){
    const randomSerie: number = Math.floor(Math.random() * 20);  
    headerBackImage = `${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${discoverSeries.results[randomSerie].backdrop_path}`
  }   

  context.res.setHeader('Cache-control', `public, s-maxage=432000, max-age=432000, stale-while-revalidate=59`);
  return {
      props: {
        movies: discoverMovies.results,
        series: discoverSeries.results,
        headerImage: headerBackImage,
        language
      }
  }
}
