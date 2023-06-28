import { TMDBMovie } from "./tmdbMovie"
import { TMDBSerie } from "./tmdbSerie"

export type TMDBDiscover = {
    page: number,
    total_pages: number,
    total_results: number,
    results: TMDBMovie[]|TMDBSerie[]
}