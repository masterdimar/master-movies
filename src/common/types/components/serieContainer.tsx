import Image from 'next/image';
import { TMDBSerie } from "../tmdbSerie";

type Props ={
  series: TMDBSerie[],
}

export default function SerieContainer(props: Props) {
    const imageSizes: string = '(max-width: 250px) 100vw, (max-width: 500px) 50vw, (max-width: 999px) 20vw, 10vw'


    return (
        <div className='flex flex-row overflow-x-auto pt-4 bg-gray-300'>
            {props.series.map((serie, index) => (
                <div key={`movie${serie.id}`} className="flex flex-shrink-0 flex-col w-32 h-72 sm:w-52 sm:h-96  ml-2 mr-2">
                    <div className="flex w-full pt-1 h-48 sm:h-80 justify-center relative">
                        <Image className="rounded-3xl" src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD}${serie.poster_path}`} fill style={{objectFit: 'cover',}} sizes={imageSizes} alt={serie.name}/>
                    </div>
                     <div className="flex w-full pl-2 text-left">
                        <h3>{serie.name}</h3>
                    </div>
                </div>
                
			))}
        </div>
    )
}