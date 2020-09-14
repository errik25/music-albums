import axios from "axios";

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'

export function search(query, page = 0) {
    return dispatch => {
        dispatch({type: SEARCH_REQUEST, payload: {query, page}})
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
