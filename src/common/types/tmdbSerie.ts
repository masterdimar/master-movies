import { Credit } from "./credit"
import { Genre } from "./genre"
import { WatchProvider } from "./watchProvider"

export type TMDBSerie = {
    id: number,
    genres: Genre[],
    backdrop_path: string,
    overview: string,
    first_air_date: string,
    last_air_date: string,
    poster_path: string,
    name: string,
    number_of_seasons: number,
    credits?: Credit,
    'watch/providers'?: WatchProvider
}