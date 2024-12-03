import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegStar } from 'react-icons/fa'
import WatchlistButton from './WatchlistButton'

const MovieCard = ({ title, rating, posterPath, id, mediaType }) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    return (
        <div className='group flex flex-col relative bg-[#20283E]/70 backdrop-blur-xl w-full rounded-lg h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
            <Link to={`/${mediaType}/${id}`}>
                <span className='absolute top-5 left-5 z-10 bg-black/65 flex items-center flex-row rounded-md gap-1 px-2 py-1 backdrop-blur-sm'>
                    <FaRegStar className='text-yellow-500' size={14} />
                    <p className='text-yellow-500 text-sm font-medium'>{rating}</p>
                </span>
                <WatchlistButton itemId={id} />
                <div className="relative w-full aspect-[2/3] p-3">
                    {imageLoading && (
                        <div className="absolute inset-3 bg-gray-700/50 backdrop-blur-sm animate-pulse rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                    <img
                        src={imageError ? '/placeholder-poster.jpg' : `https://image.tmdb.org/t/p/w500${posterPath}`}
                        alt={title}
                        onError={() => setImageError(true)}
                        onLoad={() => setImageLoading(false)}
                        className={`rounded-lg w-full h-full object-cover transition-all duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                    />
                    <div className="absolute inset-3 rounded-lg bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h1 className='p-3 text-slate-300 text-sm font-medium pb-5 truncate'>
                    {title}
                </h1>
            </Link>
        </div>
    )
}

export default MovieCard




