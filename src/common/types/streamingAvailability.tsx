export type StreamingAvailability = {
    result: StreamingAvailabilityResult
}

export type StreamingAvailabilityResult = {
    streamingInfo: StreamingAvailabilityStreamingInfo
}

export type StreamingAvailabilityStreamingInfo = {
    [key: string]: StreamingAvailabilityCountry
}

export type StreamingAvailabilityCountry = {
    [key: string]: StreamingAvailabilityService[]
}

export type StreamingAvailabilityService = {
    type: string,
    link: string
}