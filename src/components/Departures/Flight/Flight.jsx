import React from 'react';
import s from "./Flight.module.css";
import plane from "../../../assets/images/plane.png";
import arrow from "../../../assets/images/arrow.png";
import like from "../../../assets/images/Vector.svg";
import like2 from "../../../assets/images/like2.png";
import {dateConvertor, formatString} from "../../Common/functions";
import {useDispatch} from "react-redux";
import {addToFavorites, removeFromFavorites} from "../../../redux/departures-reducer";

const Flight = ({places, symbol, quote, favorites, dictionaries}) => {

    let dispatch = useDispatch();
    let carrierCodes = quote.validatingAirlineCodes;
    let favorite = favorites.filter(f => (quote.itineraries[0].segments[0].departure.at === f.itineraries[0].segments[0].departure.at) &&
        (quote.id === f.id)).length;

    const addToFavorite = () => {
        if (favorite > 0) {
            dispatch(removeFromFavorites(quote));
        } else {
            dispatch(addToFavorites(quote));
        }
    }
    return (
       <div className={s.flight}>
          <div style={{display:"flex", alignItems:"center"}}>
              <div className={s.plane}><img src={plane} alt="plane" height={35}/></div>
              <div className={s.info}>
                  <div className={s.places}>{places.from}<img src={arrow} alt="" height={10}/>{places.to}</div>
                  <span>{dateConvertor(quote.itineraries[0].segments[0].departure.at)}</span>
                  <span>{carrierCodes.map(code => {
                      if (code === "AF") {
                          return formatString("AIR FRANCE")
                      }
                      else
                         return formatString(dictionaries.carriers[code])
                      })}</span>
              </div>
          </div>
           <div className={s.price}>
               <img  src={favorite > 0 ? like2 : like} height={18} alt="" onClick={addToFavorite}/>
               <div>
                   <span style={{marginRight:"8px"}}>Price:</span>
                   {new Intl.NumberFormat('ru-RU').format(quote.price.total)+" "+symbol}
               </div>
           </div>
       </div>
    );
}
export default Flight;