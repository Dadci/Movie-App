import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '../store/moviesSlice'
import { useParams } from 'react-router-dom'
import { FaClock, FaCalendar, FaStar, FaGlobe, FaTv, FaUsers } from 'react-icons/fa'
import TvShowDetailsSkeleton from '../components/TvShowDetailsSkeleton'

const TvShowDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { currentItem: show, detailsStatus } = useSelector(state => state.movies)

    useEffect(() => {
        if (id) {
            dispatch(getDetails({ id, mediaType: 'tv' }))
        }
    }, [dispatch, id])

    if (detailsStatus === 'loading') {
        return (
            <TvShowDetailsSkeleton />
        )
    }

    return (
        <div className='w-screen flex flex-col min-h-screen relative bg-[#121829] p-16 pb-24'>
            {show && (
                <>
                    {/* Hero Section */}
                    <div className="flex flex-col mt-8 gap-8">
                        <div className='px-16 flex items-center justify-center relative w-full'>
                            <img
                                src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                                alt=""
                                className='w-full bg-cover object-cover rounded-3xl aspect-[21/9] h-[500px]'
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121829] to-transparent rounded-3xl" />

                            <div className='absolute flex flex-col gap-4 p-8 bottom-8 left-24 w-2/5 bg-white/10 rounded-3xl backdrop-blur-xl'>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full">
                                        {show.status}
                                    </span>
                                    <span className="text-yellow-500 flex items-center gap-1">
                                        <FaStar className="w-4 h-4" />
                                        {show.vote_average?.toFixed(1)}
                                    </span>
                                </div>
                                <h1 className='text-white text-3xl font-bold'>
                                    {show.name}
                                </h1>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className='flex justify-center px-16 gap-14 mt-12'>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                alt={show.name}
                                className="w-1/4 rounded-xl shadow-xl aspect-[2/3] object-cover" // Updated className
                            />

                            <div className="flex flex-col gap-6 w-2/5">
                                <div className="flex gap-4 flex-wrap">
                                    {show?.genres?.map(genre => (
                                        <span key={genre.id} className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-gray-300 text-md leading-relaxed">{show.overview}</p>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <InfoItem
                                        icon={<FaTv />}
                                        label="Seasons"
                                        value={`${show.number_of_seasons} (${show.number_of_episodes} episodes)`}
                                    />
                                    <InfoItem
                                        icon={<FaCalendar />}
                                        label="First Air Date"
                                        value={show.first_air_date}
                                    />
                                    <InfoItem
                                        icon={<FaGlobe />}
                                        label="Language"
                                        value={show.original_language?.toUpperCase()}
                                    />
                                    <InfoItem
                                        icon={<FaUsers />}
                                        label="Popularity"
                                        value={show.popularity?.toFixed(0)}
                                    />
                                </div>

                                {/* Additional TV Show Info */}
                                {show.networks && show.networks.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-slate-500 text-sm font-medium mb-4">Networks</h3>
                                        <div className="flex gap-4 flex-wrap">
                                            {show.networks.map(network => (
                                                <span key={network.id} className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm">
                                                    {network.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {show.created_by && show.created_by.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-slate-500 text-sm font-medium mb-4">Created By</h3>
                                        <div className="flex gap-4 flex-wrap">
                                            {show.created_by.map(creator => (
                                                <span key={creator.id} className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm">
                                                    {creator.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Latest Season Info */}
                                {show.last_episode_to_air && (
                                    <div className="mt-6">
                                        <h3 className="text-slate-500 text-sm font-medium mb-4">Latest Episode</h3>
                                        <div className="flex gap-4 flex-wrap">
                                            <span className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm">
                                                {show.last_episode_to_air.name}
                                            </span>
                                            <span className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm">
                                                {show.last_episode_to_air.air_date}
                                            </span>
                                        </div>
                                    </div>
                                )}
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

export default TvShowDetails