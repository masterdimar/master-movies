import Image from 'next/image';
import { TMDBMovie } from "../types/tmdbMovie";
import Link from 'next/link';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useRef } from 'react';

type Props ={
  movies: TMDBMovie[],
  language: string
}

export default function MovieContainer(props: Props) {
    const imageSizes: string = '(max-width: 250px) 100vw, (max-width: 500px) 50vw, (max-width: 999px) 20vw, 10vw'

    const sliderRef = useRef<HTMLDivElement>(null);

    function handleScroll(amount: number) {
        if (sliderRef.current != null) {
            sliderRef.current.scrollLeft += amount;
        }

    }

    return (
        <>
            <div className="flex">
                <div className="flex-1">
                    <h2>Películas populares</h2>
                </div>
                <div>
                    <MdChevronLeft onClick={() => handleScroll(-500)} className='visible md:hidden flechas'/>
                </div>
                <div>
                    <MdChevronRight onClick={() => handleScroll(500)} className='visible md:hidden flechas'/>
                </div>
            </div>
            
            <div className='relative flex items-center'>
                <MdChevronLeft onClick={() => handleScroll(-500)} className='hidden md:block flechas'/>
                <div ref={sliderRef} className='flex-1 contenedorThumbs'>
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
                <MdChevronRight onClick={() => handleScroll(500)} className='hidden md:block flechas'/>
            </div>
        </>
    )
}