import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {addToFavourites, readFavourites, removeFromFavourites, search} from "./actions/PageActions";

function App(props) {

    let [searchField, setSearchField] = useState('dreaming out loud');
    useState(() => {
        props.readFavourites()
    }, [])

    const favourites = props.favourites.map((item) =>
        <div className={'App__resultRow'} key={'favourite-' + item.id}>
            <div>
                {item['artist-credit'][0].name} -
                {item.title}
            </div>
            <div className="App__addToFavourites"
                 onClick={() => {
                     props.removeFromFavourites(item)
                 }}>
                remove
            </div>
        </div>
    )

    const searchResult = props.searchResult.map((item) =>
        <div className={'App__resultRow'} key={item.id}>
            <div>
                {item['artist-credit'][0].name} -
                {item.title}
            </div>
            {item.isFavourite ?
                <div className="App__addToFavourites"
                     onClick={() => {
                         props.removeFromFavourites(item)
                     }}>
                    remove
                </div>
                :
                <div className="App__addToFavourites"
                     onClick={() => {
                         props.addToFavourites(item)
                     }}>
                    Add to favourites
                </div>
            }
        </div>
    )

    return (
        <Router>
            <div className="App">
                <Route path="/">
                    <div>
                        <input className="App__searchField" value={searchField}
                               onChange={(e) => {
                                   setSearchField(e.target.value)
                               }}/>
                        <div className="App__searchButton" onClick={() => {
                            props.search(searchField)
                        }}>
                            Search
                        </div>
                    </div>
                    {props.isFetching ?
                        'loading'
                        :
                        <div className={'App__searchResults'}>
                            {searchResult}
                        </div>
                    }
                    <div className={'App__favourites'}>
                        {favourites}
                    </div>
                </Route>
            </div>
        </Router>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        search: query => dispatch(search(query)),
        addToFavourites: item => dispatch(addToFavourites(item)),
        removeFromFavourites: item => dispatch(removeFromFavourites(item)),
        readFavourites: item => dispatch(readFavourites()),
    }
}

const mapStateToProps = store => {
    return {
        searchResult: store.page.searchResult,
        favourites: store.page.favourites,
        isFetching: store.page.isFetching
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
