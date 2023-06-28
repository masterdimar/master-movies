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

        const numRows = Math.ceil(props.movies.length / numItemsPerRow);
        const calculatedContainerHeight = (numRows * itemWidth) + (numRows * 125); // Assuming 1rem = 16px
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
        <div className='overflow-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
          <div ref={sliderRef} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4' style={{ height: `${containerHeight}px` }}>
            {props.movies.map((movie, index) => (
              <div key={`movie${movie.id}`} className="thumbBox">
                <Link href={`/movie/${movie.id}?language=${props.language}`}>
                  <div className="thumbIMG">
                    <Image
                      className="thumbIMGBorder"
                      src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD}${movie.poster_path}`}
                      fill
                      placeholder='blur'
                      blurDataURL={`/_next/image?url=${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_POSTER_SIZE_CARD_MIN}${movie.poster_path}&w=16&q=1`}
                      style={{ objectFit: 'cover' }}
                      alt={movie.title}
                    />
                  </div>
                  <div className="thumbTXT">
                    <h3>{movie.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button className="botonVerMas">
            See more
            </button>
        </div>
        </div>
      )}

    </>
  )
}
