import React, {useState} from 'react';
import './Favourites.css';
import {connect} from 'react-redux'
import {readFavourites, removeFromFavourites} from "../../actions/favouritesActions";

function Favourites(props) {

    useState(() => {
        props.readFavourites()
    }, [])

    const favourites = props.favourites.map((item) =>
        <div className={'Favourites__row'} key={item.id}>
            <div>
                {item['artist-credit'][0].name} -
                {item.title}
            </div>
            <div className="Favourites__remove"
                 onClick={() => {
                     props.removeFromFavourites(item)
                 }}>
                remove
            </div>
        </div>
    )

    return (
        <div className="Favourites">
            <div className={'Favourites__list'}>
                {favourites}
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromFavourites: item => dispatch(removeFromFavourites(item)),
        readFavourites: () => dispatch(readFavourites())
    }
}

const mapStateToProps = store => {
    return {
        favourites: store.favourites.favourites,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)
