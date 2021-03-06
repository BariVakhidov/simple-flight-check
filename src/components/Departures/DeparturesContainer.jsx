import React from 'react';
import Departures from "./Departures";
import {connect} from "react-redux";
import {addToFavorites, removeFromFavorites, requestQuotes, setDate} from "../../redux/departures-reducer";
class DeparturesContainer extends React.PureComponent {

    componentDidMount() {
        this.props.requestQuotes();
    }

    render() {
        return <Departures {...this.props}/>
    }

}

let mapStateToProps = (state) => {
    return {
        photos: state.departures.images,
        quotes: state.departures.quotes,
        places: state.departures.places,
        loading: state.departures.loading,
        date: state.departures.date,
        symbol: state.departures.currency.symbol,
        likes: state.departures.favorites.length,
        favorites: state.departures.favorites,
        isLoading: state.departures.loading,
        dictionaries: state.departures.dictionaries
    }
}
export default connect(mapStateToProps,{requestQuotes, setDate, addToFavorites, removeFromFavorites})(DeparturesContainer)