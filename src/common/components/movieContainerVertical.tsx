import Image from 'next/image';
import { TMDBMovie } from "../types/tmdbMovie";
import Link from 'next/link';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useRef, useEffect, useState } from 'react';

type Props = {
  movies: TMDBMovie[],
  language: string
}

export default function MovieContainerVertical(props: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth;
      const itemWidth = (sliderRef.current?.firstElementChild as HTMLElement | null)?.offsetWidth;

      if (containerWidth && itemWidth) {
        const numItemsPerRow = Math.floor(containerWidth / itemWidth);
        sliderRef.current.style.gridTemplateColumns = `repeat(auto-fill, minmax(${itemWidth}px, 1fr))`;
        sliderRef.current.style.gridGap = '1rem';

        const numRows = 1; //Math.ceil(props.movies.length / numItemsPerRow);
        const calculatedContainerHeight = (numRows * itemWidth) + (numRows * 180); // Assuming 1rem = 16px
        setContainerHeight(calculatedContainerHeight);
      }
    }
  }, [props.movies]);

  return (
    <>
      <div className="contenedorTituloThumbs">
        <h2 className='mr-2'>Películas populares</h2>
      </div>

      {props.movies.length === 0 ? (
        <div className="contenedorTituloThumbs">
        <h2 className='h2-italic'>No matches</h2></div>
      ) : (
        <div>
        <div className='overflow-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
          <div ref={sliderRef} className='contenedorVertical' style={{ height: `${containerHeight}px` }}>
            {props.movies.map((movie, index) => (
              <div key={`movie${movie.id}`} className="thumbBox">
                <Link href={`/movie/${movie.id}?language=${props.language}`}>
                  <div className="thumbIMG">
                  
                  {!movie.poster_path.split('/')[0].includes('undefined') ? (
                    <Image
                      className="thumbIMGBorder"
                      src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD}${movie.poster_path}`}
                      fill
                      placeholder='blur'
                      blurDataURL={`/_next/image?url=${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD_MIN}${movie.poster_path}&w=16&q=1`}
                      style={{ objectFit: 'cover' }}
                      alt={movie.title}
                    />
                    ) : (
                      <Image
                      className="thumbIMGBorder"
                      src='/images/ImageFallBack.png'
                      fill
                      placeholder='blur'
                      blurDataURL='/images/ImageFallBack.png'
                      style={{ objectFit: 'cover' }}
                      alt={movie.title}
                    />
                    )}
                  </div>
                  <div className="thumbTXT">
                    <h3>{movie.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="botonVerMas">
            Ver más
            </button>
        </div>
        </div>
      )}

    </>
  )
}
