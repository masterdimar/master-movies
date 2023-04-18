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