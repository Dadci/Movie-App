import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '../store/moviesSlice' // Change this import
import { useParams } from 'react-router-dom'
import { FaClock, FaCalendar, FaStar, FaGlobe } from 'react-icons/fa'

const MovieDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  // Change this to use currentItem
  const { currentItem: movie, detailsStatus } = useSelector(state => state.movies)

  useEffect(() => {
    if (id) {
      dispatch(getDetails({ id, mediaType: 'movie' })) // Pass mediaType as 'movie'
        .unwrap()
        .then(result => console.log('Fetched data:', result))
        .catch(error => console.error('Error:', error));
    }
  }, [dispatch, id])

  if (detailsStatus === 'loading') {
    return (
      <div className="w-screen h-screen bg-[#121829] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className='w-screen flex flex-col min-h-screen relative bg-[#121829] p-16 pb-12'>
      {movie && ( // Change currentMovie to movie
        <>
          {/* Hero Section */}
          <div className="flex flex-col mt-8 gap-8">
            <div className='px-16 flex items-center justify-center relative w-full'>
              <img 
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                alt="" 
                className='w-full bg-cover object-cover rounded-3xl aspect-[21/9] h-[500px]' 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121829] to-transparent rounded-3xl" />

              <div className='absolute flex flex-col gap-4 p-8 bottom-8 left-24 w-2/5 bg-white/10 rounded-3xl backdrop-blur-xl'>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full">
                    {movie.status}
                  </span>
                  <span className="text-yellow-500 flex items-center gap-1">
                    <FaStar className="w-4 h-4" />
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
                <h1 className='text-white text-3xl font-bold'>
                  {movie.title}
                </h1>
              </div>
            </div>

            {/* Details Section */}
            <div className='flex justify-center px-16 gap-14 mt-12'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-1/4 rounded-xl shadow-xl"
              />
              
              <div className="flex flex-col gap-6 w-2/5">
                <div className="flex gap-4 flex-wrap">
                  {movie?.genres?.map(genre => (
                    <span key={genre.id} className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 text-md leading-relaxed">{movie.overview}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InfoItem icon={<FaClock />} label="Runtime" value={`${movie.runtime} min`} />
                  <InfoItem icon={<FaCalendar />} label="Release Date" value={movie.release_date} />
                  <InfoItem icon={<FaGlobe />} label="Language" value={movie.original_language?.toUpperCase()} />
                  <InfoItem icon={<FaStar />} label="Popularity" value={movie.popularity?.toFixed(0)} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
    <span className="text-indigo-400">{icon}</span>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  </div>
)

export default MovieDetails