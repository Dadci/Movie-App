import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchContent = async (type = 'all', page = 1) => {
    try {
        const endpoints = {
            all: [
                `${BASE_URL}/movie/top_rated?page=${page}`,
                `${BASE_URL}/tv/top_rated?page=${page}`
            ],
            movies: [`${BASE_URL}/movie/top_rated?page=${page}`],
            tv: [`${BASE_URL}/tv/top_rated?page=${page}`]
        };

        const urls = endpoints[type] || endpoints.all;
        const requests = urls.map(url => 
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            })
        );

        const responses = await Promise.all(requests);
        const results = responses.flatMap(response => 
            response.data.results.map(item => ({
                ...item,
                media_type: item.first_air_date ? 'tv' : 'movie',
                title: item.title || item.name
            }))
        );

        return {
            results,
            totalPages: Math.min(...responses.map(r => r.data.total_pages))
        };
    } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
    }
};


export const fetchMovieById = async (id) => {
    try {
        const url = `${BASE_URL}/movie/${id}`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export const fetchDetailsById = async (id, mediaType) => {
    try {
        const url = `${BASE_URL}/${mediaType}/${id}`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        // Handle both movie and TV show data structures
        return {
            ...response.data,
            media_type: mediaType,
            title: mediaType === 'tv' ? response.data.name : response.data.title
        };
    } catch (error) {
        console.error('Error fetching details:', error);
        throw error;
    }
};