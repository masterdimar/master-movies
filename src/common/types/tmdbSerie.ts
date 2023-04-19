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
    credits?: Credit
}

export type Genre = {
    id: number,
    name: string
}

export type Credit = {
    cast: Cast[]
}

export type Cast = {
    original_name: string,
    known_for_department: string,
    order: number,
}