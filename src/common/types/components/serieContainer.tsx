import Image from 'next/image';
import { TMDBSerie } from "../tmdbSerie";

type Props ={
  series: TMDBSerie[],
}

export default function SerieContainer(props: Props) {
    return (
        <div className='flex flex-row overflow-x-auto pt-4 bg-gray-300'>
            {props.series.map((serie, index) => (
                <div className="flex flex-shrink-0 flex-col w-32 h-[19rem] sm:w-52 sm:h-[22rem] ml-2 mr-2">
                    <div className="flex w-full pt-1 h-72 justify-center">
                        <Image className="rounded-3xl" src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${serie.poster_path}`} width={200} height={200} style={{objectFit: 'contain',}} alt=""/>
                    </div>
                    <div className="flex w-full pl-2 text-left h-full">
                        <h3>{serie.name}</h3>
                    </div>                    
                </div>
                
			))}
        </div>
    )
}