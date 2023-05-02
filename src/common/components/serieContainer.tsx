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
        <div className='contenedorThumbs'>
            {props.series.map((serie, index) => (
                <div key={`serie${serie.id}`} className="thumbBox">
                    <Link href={`/serie/${serie.id}?language=${props.language}`}>
                        <div className="thumbIMG">
                            <Image className="thumbIMGBorder" 
                                        src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD}${serie.poster_path}`} 
                                        fill
                                        placeholder='blur'
                                        blurDataURL={`/_next/image?url=${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD_MIN}${serie.poster_path}&w=16&q=1`} 
                                        style={{objectFit: 'cover',}} 
                                        sizes={imageSizes} alt={serie.name}/>
                        </div>
                        <div className="thumbTXT">
                            <h3>{serie.name}</h3>
                        </div>
                    </Link> 
                </div>
                
			))}
        </div>
    )
}