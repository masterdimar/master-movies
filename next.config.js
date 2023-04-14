/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
		domains: [
			'image.tmdb.org',
		],
  },
  env: {
    THEMOVIEDB_BASE_URL: process.env.THEMOVIEDB_BASE_URL,
    THEMOVIEDB_POSTER_SIZE: process.env.THEMOVIEDB_POSTER_SIZE,
    THEMOVIEDB_POSTER_SIZE_CARD: process.env.THEMOVIEDB_POSTER_SIZE_CARD,
    THEMOVIEDB_BACKDROP_SIZE: process.env.THEMOVIEDB_BACKDROP_SIZE,
  }
}

module.exports = nextConfig
