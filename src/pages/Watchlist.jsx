// src/pages/Watchlist.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard'

const Watchlist = () => {
  const { content, watchlist } = useSelector(state => state.movies)
  const watchlistedContent = content.filter(item => watchlist.includes(item.id))

  if (watchlistedContent.length === 0) {
    return (
      <div className="min-h-screen bg-[#121829] pt-28 px-16">
        <h1 className="text-2xl font-bold text-white mb-8">My Watchlist</h1>
        <div className="flex items-center justify-center h-[400px] text-gray-400">
          Your watchlist is empty
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121829] pt-28 px-16">
      <h1 className="text-2xl font-bold text-white mb-8">My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {watchlistedContent.map(item => (
          <MovieCard
            key={item.id}
            id={item.id}
            title={item.title}
            rating={item.vote_average}
            posterPath={item.poster_path}
            mediaType={item.media_type}
          />
        ))}
      </div>
    </div>
  )
}

export default Watchlist