const initialState = {
    searchQuery: '',
    searchResult: [],
    isFetching: false,
    page: 0,
    errorMessage: null
}

import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
} from '../actions/searchActions'

export function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                isFetching: true,
                searchQuery: action.payload.query,
                page: action.payload.page > 0 ? action.payload.page : 0,
                errorMessage: null
            }

        case SEARCH_SUCCESS: {
            let searchResult = action.payload.data;
            return {
                ...state,
                searchResult:
                searchResult.recordings,
                isFetching: false,
                errorMessage: null
            }
        }

        case SEARCH_FAILURE:
            let errorMessage = 'Something went wrong, please try again'
            if (action.payload.response.status === 400) {
                errorMessage = 'No results found for this query'
            }
            return {
                ...state,
                isFetching: false,
                searchResult: [],
                errorMessage
            }

        default:
            return state
    }
}
