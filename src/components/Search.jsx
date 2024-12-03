import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/moviesSlice';

const Search = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(state => state.movies.searchQuery);

    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <div className='px-16 mt-5 relative flex items-center'>
            <input 
                type="search" 
                className='bg-slate-900/30 border border-gray-700 rounded-lg h-14 pl-10 pr-2 placeholder:text-gray-700 text-gray-500 text-sm placeholder:text-sm w-72 shadow-sm' 
                placeholder='Search Movies or TV Shows' 
                value={searchQuery}
                onChange={handleSearch}
            />
            <FaSearch className='absolute top-5 left-20 text-gray-600' />
        </div>
    )
}

export default Search