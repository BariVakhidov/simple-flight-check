import React, {useEffect} from 'react';
import Departures from "./Departures";
import {connect} from "react-redux";
import {
    addToFavorites,
    removeFromFavorites,
    requestQuotes,
    requestToken,
    setDate
} from "../../redux/departures-reducer";

const DeparturesContainer = (props) => {
    useEffect(() => props.requestQuotes(props.token), []);
    return <Departures {...props}/>
}

let mapStateToProps = (state) => {
    return {
        photos: state.departures.images,
       /* quotes: state.departures.quotes,*/
        places: state.departures.places,
        loading: state.departures.loading,
        date: state.departures.date,
        symbol: state.departures.currency.symbol,
        likes: state.departures.favorites.length,
        favorites: state.departures.favorites,
        isLoading: state.departures.loading,
        dictionaries: state.departures.dictionaries,
        token: state.departures.token

    }
}
export default connect(mapStateToProps, {
    requestQuotes,
    setDate,
    addToFavorites,
    removeFromFavorites,
    requestToken
})(DeparturesContainer)