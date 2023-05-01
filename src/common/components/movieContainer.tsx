import Image from 'next/image';
import { TMDBMovie } from "../types/tmdbMovie";
import Link from 'next/link';

type Props ={
  movies: TMDBMovie[],
  country: string,
  language: string
}

export default function MovieContainer(props: Props) {
    const imageSizes: string = '(max-width: 250px) 100vw, (max-width: 500px) 50vw, (max-width: 999px) 20vw, 10vw'


    return (
        <div className='flex flex-row overflow-x-auto overflow-y-hidden pt-4 bg-black'>
            {props.movies.map((movie, index) => (
                <div key={`movie${movie.id}`} className="flex flex-shrink-0 flex-col w-32 h-72 sm:w-52 sm:h-96  ml-2 mr-2">
                    <Link href={`/movie/${movie.id}?language=${props.language}`}>
                        <div className="flex w-full pt-1 h-48 sm:h-80 justify-center relative">
                            <Image className="rounded-3xl" 
                                    src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD}${movie.poster_path}`} 
                                    fill
                                    placeholder='blur'
                                    blurDataURL={`/_next/image?url=${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD_MIN}${movie.poster_path}&w=16&q=1`} 
                                    style={{objectFit: 'cover',}} 
                                    sizes={imageSizes} alt={movie.title}/>
                        </div>
                        <div className="flex w-full pl-2 text-left">
                            <h3>{movie.title}</h3>
                        </div>
                    </Link>                    
                </div>
                
			))}
        </div>
    )
}