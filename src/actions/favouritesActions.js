export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES'
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES'
export const READ_FAVOURITES = 'READ_FAVOURITES'

export function addToFavourites(item) {
    return {type: ADD_TO_FAVOURITES, payload: item}
}

export function removeFromFavourites(item) {
    return {type: REMOVE_FROM_FAVOURITES, payload: item}
}

export function readFavourites() {
    return {type: READ_FAVOURITES}
}
