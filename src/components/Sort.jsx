// src/components/Sort.jsx
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortBy, setSortOrder } from '../store/moviesSlice'
import { FaSort } from 'react-icons/fa'

const Sort = () => {
  const dispatch = useDispatch()
  const { sortBy, sortOrder } = useSelector(state => state.movies)

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'vote_average', label: 'Rating' },
    { value: 'release_date', label: 'Release Date' },
    { value: 'title', label: 'Title' }
  ]

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-slate-900/30 border border-slate-700 rounded-lg p-2">
        <FaSort className="text-gray-400" />
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="bg-transparent text-gray-400 text-sm focus:outline-none"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
          className="text-gray-400 hover:text-white"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  )
}

export default Sort