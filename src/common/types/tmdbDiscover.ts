import { TMDBMovie } from "./tmdbMovie"
import { TMDBSerie } from "./tmdbSerie"

export type TMDBDiscover = {
    results: TMDBMovie[]|TMDBSerie[]
}