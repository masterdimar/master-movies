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
    credits?: Credit
    'watch/providers'?: WatchProvider
}