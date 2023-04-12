// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type Regions = {
  results: Region[]
}

type Region = {
  iso_3166_1: string
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const country = await GetCountry(request)    
  const language = request.headers.get('accept-language')?.split(',')?.[0] || 'en-US'
  
  request.nextUrl.pathname = `/${country.toUpperCase()}`    
  request.nextUrl.searchParams.set("language", language)
  return NextResponse.redirect(request.nextUrl)
}


async function GetCountry(request: NextRequest){
  let country = request.geo?.country?.toLowerCase() || 'us'

  //Get available Regions
  let regions: Regions = await fetch(`${process.env.THEMOVIEDB_API_URL}/watch/providers/regions?api_key=${process.env.THEMOVIEDB_API_KEY}`
	).then((x) => x.json());
 
  //Check available Region
  if(regions.results.find((result) => result.iso_3166_1.toLowerCase() == country) == null){
    console.log(`Country ${country} not available. Redirecting to us`)
    country = "us"
  }

  return country
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}