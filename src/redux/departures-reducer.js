import image1 from "../assets/images/1.jpg"
import image2 from "../assets/images/2.jpg"
import image3 from "../assets/images/3.jpg"
import image4 from "../assets/images/4.jpg"
import image5 from "../assets/images/5.jpg"
import image6 from "../assets/images/6.jpg"

const SET_QUOTES = "simple-flight-check/departures/SET_QUOTES";
const SET_DICTIONARIES = "simple-flight-check/departures/SET_DICTIONARIES";
const SET_DATE= "simple-flight-check/departures/SET_DATE";
const ADD_TO_FAVORITES= "simple-flight-check/departures/ADD_TO_FAVORITES";
const REMOVE_FROM_FAVORITES= "simple-flight-check/departures/REMOVE_FROM_FAVORITES";
const SET_LOADING = "simple-flight-check/departures/SET_LOADING";
export const REQUEST_QUOTES = "simple-flight-check/departures/REQUEST_QUOTES";

export const setQuotes = (quotes) => ({type: SET_QUOTES, quotes});
export const setDictionaries = (dictionaries) => ({type: SET_DICTIONARIES, dictionaries});
export const addToFavorites = (quote) => ({type: ADD_TO_FAVORITES, quote});
export const removeFromFavorites = (quote) => ({type: REMOVE_FROM_FAVORITES, quote});
export const setLoading = () => ({type: SET_LOADING});
export const setDate = (date) => ({type: SET_DATE, date});

let initialState = {
    date: new Date(),
    favorites: [],
    quotes: [],
    dictionaries: [],
    currency: {
        symbol: "₽"
    },
    places: {
        to: "New York City (JFK)",
        from: "Moscow (SVO)"
    },
    images: [image1, image2, image3, image4, image5, image6],
    loading: false,
    error: null
}

const departuresReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUOTES:
            return {
                ...state,
                quotes: action.quotes
            }
        case SET_DICTIONARIES:
            return {
                ...state,
                dictionaries: action.dictionaries
            }
        case SET_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites.map(q => q), action.quote]
            }
        case REMOVE_FROM_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites].filter(quote => quote !== action.quote)
            }
        case SET_DATE:
            return {
                ...state,
                date: action.date
            }
        default:
            return state;
    }
}
export default departuresReducer;

export const requestQuotes = (date) => {
    return {type: REQUEST_QUOTES, date}
}