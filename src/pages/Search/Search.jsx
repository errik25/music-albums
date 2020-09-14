import React, {useState} from 'react';
import './Search.css';
import {connect} from 'react-redux'
import {search} from "../../actions/searchActions";
import {addToFavourites} from "../../actions/favouritesActions";

function Search(props) {
    let [searchField, setSearchField] = useState('');

    const handleInputKeys = (event) => {
        if (event.key === "Enter") {
            props.search(searchField)
        }
    }

    const searchResult = props.searchResult.map((item) =>
        <div className={'Search__resultRow'} key={item.id}>
            <div>
                {item['artist-credit'][0].name} -
                {item.title}
            </div>
            <div className="Search__addToFavourites"
                 onClick={() => {
                     props.addToFavourites(item)
                 }}>
                Add to favourites
            </div>

        </div>
    )

    return (
        <div className="Search">
            <div className={'Search__inputRow'}>
                <input className="Search__input" value={searchField}
                       onChange={(e) => {
                           setSearchField(e.target.value)
                       }}
                       onKeyPress={(e) => {
                           handleInputKeys(e)
                       }}
                       placeholder={'Input album name'}/>
                <div className="Search__searchButton" onClick={() => {
                    props.search(searchField)
                }}>
                    Search
                </div>
            </div>
            {props.isFetching && 'loading'}
            {!!searchResult.length &&
            <div>
                <div className={'Search__results'}>
                    {searchResult}
                </div>

                <div className="Search__pages">
                    <div className="Search__page-link"
                         onClick={() => {
                             props.search(searchField, props.page - 1)
                         }}>
                        prev page
                    </div>
                    <div>
                        {props.page + 1}
                    </div>
                    <div className="Search__page-link"
                         onClick={() => {
                             props.search(searchField, props.page + 1)
                         }}>
                        next page
                    </div>
                </div>
            </div>
            }
            {props.errorMessage &&
            <div>
                {props.errorMessage}
            </div>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        search: (query, page) => dispatch(search(query, page)),
        addToFavourites: item => dispatch(addToFavourites(item))
    }
}

const mapStateToProps = store => {
    return {
        searchResult: store.search.searchResult,
        isFetching: store.search.isFetching,
        page: store.search.page,
        errorMessage: store.search.errorMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
