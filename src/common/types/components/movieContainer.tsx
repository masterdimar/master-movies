import Image from 'next/image';
import { TMDBMovie } from "../tmdbMovie";

type Props ={
  movies: TMDBMovie[],
}

export default function MovieContainer(props: Props) {
    return (
        <div className='flex flex-row overflow-x-auto pt-4 bg-gray-300'>
            {props.movies.map((movie, index) => (
                <div className="flex flex-shrink-0 flex-col w-32 h-[19rem] sm:w-52 sm:h-[22rem] ml-2 mr-2">
                    <div className="flex w-full pt-1 h-72 justify-center">
                        <Image className="rounded-3xl" src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${movie.poster_path}`} width={200} height={200} style={{objectFit: 'contain',}} alt=""/>
                    </div>
                    <div className="flex w-full pl-2 text-left h-full">
                        <h3>{movie.title}</h3>
                    </div>                    
                </div>
                
			))}
        </div>
    )
}