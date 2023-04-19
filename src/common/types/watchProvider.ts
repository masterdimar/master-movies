import { Provider } from "./provider"

export type WatchProvider = {
    results: any
    watchProviderCountry: WatchProviderCountry
}


export type WatchProviderCountry = {
    rent?: Provider[]
    buy?: Provider[]
    flatrate?: Provider[]
}