import MovieContainer from "@/common/components/movieContainer"
import SerieContainer from "@/common/components/serieContainer"
import { TMDBDiscover } from "@/common/types/tmdbDiscover"
import { GetServerSideProps, GetServerSidePropsContext } from "next"

type Props ={
    language: string,
    discoverMovies: TMDBDiscover,
    discoverSeries: TMDBDiscover
}

export default function Search(props: Props) {
    console.log(props.discoverMovies)
    return (
        <div>
            <MovieContainer language={props.language} movies={props.discoverMovies.results}/>
            <SerieContainer language={props.language} series={props.discoverSeries.results}/>    
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => 
{  
    const language: string = context.query?.language?.toString() || "en-US"
    const country: string = language.split("-")[1]
    const searchTerm: string = context.query?.searchTerm?.toString();

    const movieProviders = await fetch(`${process.env.THEMOVIEDB_API_URL}/watch/providers/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&language=en-US&watch_region=${country}`).then((x) => x.json());
    const tvProviders = await fetch(`${process.env.THEMOVIEDB_API_URL}/watch/providers/tv?api_key=${process.env.THEMOVIEDB_API_KEY}&watch_region=${country}}`).then((x) => x.json());

    const movieProvidersString : string = movieProviders.results.map((provider: any) => provider.provider_id).join("|");
    const tvProvidersString : string = tvProviders.results.map((provider: any) => provider.provider_id).join("|");

    console.log(`${process.env.THEMOVIEDB_API_URL}/discover/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&with_text_query=rocky&watch_region=${country}&with_watch_providers${movieProvidersString}`);

    const discoverMovies: TMDBDiscover = await fetch(`${process.env.THEMOVIEDB_API_URL}/discover/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&with_text_query=${searchTerm}&watch_region=${country}&with_watch_providers=${movieProvidersString}`).then((x) => x.json());
    const discoverSeries: TMDBDiscover = await fetch(`${process.env.THEMOVIEDB_API_URL}/discover/tv?api_key=${process.env.THEMOVIEDB_API_KEY}&with_text_query=${searchTerm}&watch_region=${country}&with_watch_providers=${tvProvidersString}`).then((x) => x.json());
    
    return {
        props: {     
            language,
            discoverMovies,
            discoverSeries
        }
    }
}