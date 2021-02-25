import React from 'react';
import s from "./Flight.module.css";
import plane from "../../../assets/images/plane.png";
import arrow from "../../../assets/images/arrow.png";
import like from "../../../assets/images/Vector.svg";
import like2 from "../../../assets/images/like2.png";

const Flight = ({Carriers, places, symbol, quote, addToFavorites, removeFromFavorites, favorites}) => {
    let favorite = favorites.filter(f => f === quote).length;
    const addToFavorite = () => {
        if (favorite > 0) {
            removeFromFavorites(quote);
        } else {
            addToFavorites(quote);
        }
    }
    return (
       <div className={s.flight}>
          <div style={{display:"flex", alignItems:"center"}}>
              <div className={s.plane}><img src={plane} alt="plane" height={35}/></div>
              <div className={s.info}>
                  <div>{places.from } <img src={arrow} alt="" height={8}/> {places.to}</div>
                  <span>{new Date(Date.parse(quote.OutboundLeg.DepartureDate)).toLocaleString()}</span>
                  {Carriers.map(c => <span key={c.CarrierId}>{c.Name}</span>)}
              </div>
          </div>
           <div className={s.price}>
               <img  src={favorite > 0 ? like2 : like} height={18} alt="" onClick={addToFavorite}/>
               <div>
                   <span style={{marginRight:"8px"}}>Price:</span>
                   {quote.MinPrice+" "+symbol}
               </div>
           </div>
       </div>
    );
}
export default Flight;