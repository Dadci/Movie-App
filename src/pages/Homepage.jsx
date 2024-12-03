import bg from '../assets/bg.svg'
import Hero from '../components/Hero'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContent } from '../store/moviesSlice'
import MovieCardSkeleton from '../components/MovieCardSkeleton'
import Sort from '../components/Sort'
import { sortContent, filterContent } from '../utils/contentUtils'



const Homepage = () => {
    const dispatch = useDispatch();
    const { 
        content, 
        status, 
        searchQuery, 
        activeFilter,
        currentPage,
        sortBy,
        sortOrder,
        yearFilter,
        genreFilter
    } = useSelector(state => state.movies);

    useEffect(() => {
        dispatch(getContent({ type: activeFilter, page: currentPage }));
    }, [dispatch, activeFilter, currentPage]);

    const filteredContent = content.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderContent = (processedContent) => {
        if (status === 'loading') {
            return (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-1'>
        {[...Array(10)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
            );
        }

        if (status === 'failed') {
            return (
                <div className="text-center text-red-500 min-h-[400px] flex items-center justify-center">
                    <p>Error loading content. Please try again later.</p>
                </div>
            );
        }

        if (!processedContent.length) {
            return (
                <div className="text-center text-gray-500 min-h-[400px] flex items-center justify-center">
                    <p>No content found.</p>
                </div>
            );
        }

        return (
            <>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-1'>
                    {processedContent.map(item => (
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
                <Pagination />
            </>
        );
    };

    const processedContent = sortContent(
        filterContent(content, { searchQuery, yearFilter, genreFilter }), 
        sortBy, 
        sortOrder
    )

    return (
        <div className='min-h-screen relative bg-[#121829] pb-24'>
            <img src={bg} alt="background" className='absolute top-0 left-0 w-full h-full object-cover ' />
            <div className='relative z-10'>
                <div className='pt-24'>
                    <Hero />
                </div>
                <div className='mt-6 px-4 md:px-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center gap-3'>
                            <h2 className='text-2xl font-bold text-white'>
                                {activeFilter === 'all' ? 'All Content' : 
                                 activeFilter === 'movies' ? 'Movies' : 'TV Shows'}
                            </h2>
                            {content.length > 0 && (
                                <span className='text-sm text-gray-400'>
                                    ({processedContent.length})
                                </span>
                            )}
                        </div>
                        <Sort />
                    </div>
                    {renderContent(processedContent)}
                </div>
            </div>
        </div>
    );
};

export default Homepage;