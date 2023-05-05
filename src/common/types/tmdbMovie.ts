import { Credit } from "./credit"
import { Genre } from "./genre"
import { WatchProvider } from "./watchProvider"

export type TMDBMovie = {
    id: number,
    genres: Genre[],
    backdrop_path: string,
    overview: string,
    runtime: number,
    release_date: string,
    poster_path: string,
    title: string,   
    original_title: string,
    vote_average: number, 
    credits?: Credit
    'watch/providers'?: WatchProvider
}