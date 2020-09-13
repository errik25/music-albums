const initialState = {
    searchQuery: '',
    searchResult: [],
    isFetching: false,
    searchOffset: 0,
    favourites: []
}

import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, READ_FAVOURITES
} from '../actions/PageActions'

export function pageReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                isFetching: true,
                searchQuery: action.payload
            }

        case SEARCH_SUCCESS: {
            let searchResult = action.payload.data;
            return {...state, searchResult: searchResult.recordings, isFetching: false}
        }

        case SEARCH_FAILURE:
            return {...state, isFetching: false}

        case ADD_TO_FAVOURITES:
            if (!state.favourites.some(item => item.id === action.payload.id)) {
                const favourites = [...state.favourites, action.payload];
                localStorage.setItem('favouriteAlbums', JSON.stringify(favourites));
                return {...state, favourites}
            }
            return {...state}

        case REMOVE_FROM_FAVOURITES: {
            const favourites = state.favourites.filter((item) => {
                return item.id !== action.payload.id;
            })

            const updatedSearchResults = state.searchResult.map((item) => {
                let isFavourite = item.isFavourite;
                if (action.payload.id === item.id) {
                    isFavourite = false;
                }
                return {...item, isFavourite}
            })
            localStorage.setItem('favouriteAlbums', JSON.stringify(favourites));
            return {...state, favourites, searchResult: updatedSearchResults}
        }

        case READ_FAVOURITES: {
            const favourites = JSON.parse(localStorage.getItem('favouriteAlbums'));
            return {...state, favourites}
        }

        default:
            return state
    }
}
