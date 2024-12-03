// src/features/movies/moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContent, fetchMovieById, fetchDetailsById } from '../api/tmdb';

const initialState = {
    content: [],
    currentItem: null, // Rename from currentMovie to currentItem to be more generic
    status: null,
    detailsStatus: null,
    searchQuery: '',
    activeFilter: 'all',
    currentPage: 1,
    totalPages: 1,
    sortBy: 'popularity',
    sortOrder: 'desc',
    yearFilter: 'all',
    genreFilter: 'all',
    watchlist: JSON.parse(localStorage.getItem('watchlist')) || []
};

export const getContent = createAsyncThunk(
    'movies/getContent',
    async ({ type, page }) => {
        const data = await fetchContent(type, page);
        return data;
    }
);

export const getMovieDetails = createAsyncThunk(
    'movies/getMovieDetails',
    async (movieId) => {
        const movie = await fetchMovieById(movieId);
        return movie;
    }
);

export const getDetails = createAsyncThunk(
    'movies/getDetails',
    async ({ id, mediaType }) => {
        const data = await fetchDetailsById(id, mediaType);
        return data;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
            state.currentPage = 1; // Reset page when filter changes
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload
        },
        setYearFilter: (state, action) => {
            state.yearFilter = action.payload
        },
        setGenreFilter: (state, action) => {
            state.genreFilter = action.payload
        },
        toggleWatchlist: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.watchlist.find(id => id === itemId);
            
            if (existingItem) {
                state.watchlist = state.watchlist.filter(id => id !== itemId);
            } else {
                state.watchlist.push(itemId);
            }
            
            localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getContent.fulfilled, (state, action) => {
                state.content = action.payload.results;
                state.totalPages = action.payload.totalPages;
                state.status = 'succeeded';
            })
            .addCase(getContent.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getMovieDetails.pending, (state) => {
                state.detailsStatus = 'loading';
            })
            .addCase(getMovieDetails.fulfilled, (state, action) => {
                state.currentItem = action.payload;
                state.detailsStatus = 'succeeded';
            })
            .addCase(getMovieDetails.rejected, (state) => {
                state.detailsStatus = 'failed';
            })
            .addCase(getDetails.pending, (state) => {
                state.detailsStatus = 'loading';
            })
            .addCase(getDetails.fulfilled, (state, action) => {
                state.currentItem = action.payload;
                state.detailsStatus = 'succeeded';
            })
            .addCase(getDetails.rejected, (state) => {
                state.detailsStatus = 'failed';
            });
    },
});

export const { 
    setSearchQuery, 
    setActiveFilter, 
    setCurrentPage,
    setSortBy,
    setSortOrder,
    setYearFilter,
    setGenreFilter,
    toggleWatchlist 
} = moviesSlice.actions;
export default moviesSlice.reducer;
