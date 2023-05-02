import Image from 'next/image';
import { TMDBMovie } from "../types/tmdbMovie";
import Link from 'next/link';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

type Props ={
  movies: TMDBMovie[],
  language: string
}

export default function MovieContainer(props: Props) {
    const imageSizes: string = '(max-width: 250px) 100vw, (max-width: 500px) 50vw, (max-width: 999px) 20vw, 10vw'

    const slideLeft = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }

    return (
        <div className='relative flex items-center'>
            <MdChevronLeft onClick={slideLeft} className='flechas'/>
            <div id="slider" className='contenedorThumbs'>
            {props.movies.map((movie, index) => (
                <div key={`movie${movie.id}`} className="thumbBox">
                    <Link href={`/movie/${movie.id}?language=${props.language}`}>
                        <div className="thumbIMG">
                            <Image className="thumbIMGBorder" 
                                    src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD}${movie.poster_path}`} 
                                    fill
                                    placeholder='blur'
                                    blurDataURL={`/_next/image?url=${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD_MIN}${movie.poster_path}&w=16&q=1`} 
                                    style={{objectFit: 'cover',}} 
                                    sizes={imageSizes} alt={movie.title}/>
                        </div>
                        <div className="thumbTXT">
                            <h3>{movie.title}</h3>
                        </div>
                    </Link>                    
                </div>
                
			))}
        </div>
        <MdChevronRight onClick={slideRight} className='flechas'/>
        </div>
    )
}