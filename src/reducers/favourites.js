const initialState = {
    favourites: []
}

import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES, READ_FAVOURITES} from '../actions/favouritesActions'

export function favouritesReducer(state = initialState, action) {
    switch (action.type) {
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
            localStorage.setItem('favouriteAlbums', JSON.stringify(favourites));
            return {...state, favourites}
        }

        case READ_FAVOURITES: {
            const favourites = JSON.parse(localStorage.getItem('favouriteAlbums'));
            return {...state, favourites}
        }

        default:
            return state
    }
}
