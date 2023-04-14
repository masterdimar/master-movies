import Image from 'next/image';

type Props ={
    heroImage: string
  }

export default function Hero(props: Props){
    return(
        <div className='flex h-72 md:h-96 lg:h-[25rem] justify-center items-center flex-col relative bg-gray-700'>
          <div className='w-full h-full bg-cover bg-center bg-gray-300'>
            <Image src={`${process.env.THEMOVIEDB_BASE_URL}${process.env.THEMOVIEDB_BACKDROP_SIZE}${props.heroImage}`} fill style={{objectFit: 'cover',}} alt=""/>
            <div className='flex justify-center backdrop-brightness-50 bg-blue-600/40 w-full h-full'>
              <span className='text-white text-2xl sm:text-4xl md:text-4xl lg:text-5xl text-left p-4 mt-3'>Bienvenido a MASTERMOVIES! <p className='p-4'/>Aquí escontrarás en qué plataformas puedes ver tus pelis y series favoritas</span>
            </div>
          </div>
        </div>
    )
}