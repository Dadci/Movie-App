// src/utils/contentUtils.js
export const sortContent = (content, sortBy, sortOrder) => {
    return [...content].sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      }
      return sortOrder === 'asc'
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy]
    })
  }
  
  export const filterContent = (content, { searchQuery, yearFilter, genreFilter }) => {
    return content.filter(item => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesYear = yearFilter === 'all' || 
        new Date(item.release_date).getFullYear().toString() === yearFilter
      const matchesGenre = genreFilter === 'all' || 
        item.genre_ids.includes(Number(genreFilter))
      return matchesSearch && matchesYear && matchesGenre
    })
  }