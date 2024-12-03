import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter } from '../store/moviesSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const activeFilter = useSelector(state => state.movies.activeFilter);

    const handleFilterClick = (filter) => {
        dispatch(setActiveFilter(filter));
    };

    return (
        <div className='px-16 w-1/3 mt-20'>
            <div className="flex gap-4 p-2 items-center bg-slate-900/30 border border-slate-700 rounded-lg w-fit">
                {['all', 'movies', 'tv'].map((filter) => (
                    <button 
                        key={filter}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors focus:outline-none 
                            ${activeFilter === filter 
                                ? 'bg-indigo-500 text-white' 
                                : 'text-slate-500 hover:bg-indigo-500 hover:text-white'}`}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filter;