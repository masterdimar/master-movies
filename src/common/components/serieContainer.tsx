import Image from 'next/image';
import { TMDBSerie } from "../types/tmdbSerie";
import Link from 'next/link';

type Props ={
  series: TMDBSerie[],
  language: string,
}

export default function SerieContainer(props: Props) {
    const imageSizes: string = '(max-width: 250px) 100vw, (max-width: 500px) 50vw, (max-width: 999px) 20vw, 10vw'


    return (
        <div className='flex flex-row overflow-x-auto overflow-y-hidden pt-4 bg-black'>
            {props.series.map((serie, index) => (
                <div key={`serie${serie.id}`} className="flex flex-shrink-0 flex-col w-32 h-72 sm:w-52 sm:h-96  ml-2 mr-2">
                    <Link href={`/serie/${serie.id}?language=${props.language}`}>
                        <div className="flex w-full pt-1 h-48 sm:h-80 justify-center relative hover:opacity-75">
                            <Image className="rounded-2xl shadow-2xl" 
                                        src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD}${serie.poster_path}`} 
                                        fill
                                        placeholder='blur'
                                        blurDataURL={`/_next/image?url=${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD_MIN}${serie.poster_path}&w=16&q=1`} 
                                        style={{objectFit: 'cover',}} 
                                        sizes={imageSizes} alt={serie.name}/>
                        </div>
                        <div className="flex w-full pl-2 text-left">
                            <h3>{serie.name}</h3>
                        </div>
                    </Link> 
                </div>
                
			))}
        </div>
    )
}