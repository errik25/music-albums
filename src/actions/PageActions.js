import axios from "axios";

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'

export function search(query, page = 1) {
    return dispatch => {
        dispatch({type: SEARCH_REQUEST, payload: query})
        axios({
            method: 'GET',
            url: `https://musicbrainz.org/ws/2/recording/`,
            params: {
                fmt: 'json',
                query,
                offset: page * 25
            }
        }).then((response) => {
            dispatch({
                type: SEARCH_SUCCESS,
                payload: response,
            })
        }).catch((err) => {
            dispatch({
                type: SEARCH_FAILURE,
                payload: err,
            })
            console.log(err)
        })
    }
}
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES'
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES'

export function addToFavourites(item) {
    return {type: ADD_TO_FAVOURITES, payload: item}
}

export function removeFromFavourites(item) {
    return {type: REMOVE_FROM_FAVOURITES, payload: item}
}

export const READ_FAVOURITES = 'READ_FAVOURITES'
export function readFavourites() {
    return {type: READ_FAVOURITES}
}
