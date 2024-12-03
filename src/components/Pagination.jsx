import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../store/moviesSlice';

const Pagination = () => {
    const dispatch = useDispatch();
    const { currentPage, totalPages } = useSelector(state => state.movies);

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    return (
        <div className="flex justify-center gap-2 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                        ? 'bg-gray-600 text-gray-400'
                        : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
            >
                Previous
            </button>
            <span className="px-4 py-2 text-white">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                        ? 'bg-gray-600 text-gray-400'
                        : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;