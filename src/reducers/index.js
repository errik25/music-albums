import { combineReducers } from 'redux'
import { searchReducer } from './search'
import {favouritesReducer} from "./favourites";

export const rootReducer = combineReducers({
    search: searchReducer,
    favourites: favouritesReducer
})