// src/components/WatchlistButton.jsx
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWatchlist } from '../store/moviesSlice'

const WatchlistButton = ({ itemId }) => {
  const dispatch = useDispatch()
  const watchlist = useSelector(state => state.movies.watchlist)
  const isWatchlisted = watchlist.includes(itemId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(toggleWatchlist(itemId))
      }}
      className="absolute top-5 right-5 z-10 p-2 bg-black/65 rounded-full backdrop-blur-sm
        hover:bg-black/80 transition-colors duration-200"
    >
      {isWatchlisted ? (
        <FaBookmark className="text-indigo-400 w-4 h-4" />
      ) : (
        <FaRegBookmark className="text-gray-400 w-4 h-4" />
      )}
    </button>
  )
}

export default WatchlistButton