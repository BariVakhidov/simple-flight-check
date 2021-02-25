import React, {useState} from 'react';
import Calendar from 'react-calendar';
import s from "./Departures.module.css"
import 'react-calendar/dist/Calendar.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logout from "../../assets/images/logout.png";
import arrow2 from "../../assets/images/arrow2.png";
import Flight from "./Flight/Flight";
import calendar from "../../assets/images/calendar.png"

const Departures = (props) => {
    const [value, onChange] = useState(new Date());
    const [visibleCalendar, setVisibleCalendar] = useState(false);
    const settings = {
        easing: "ease-in",
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "35px",
        arrows: false,
        focusOnSelect: true

    };
    const formatter = (num) => {
        if (num < 10) {
            return "0".concat(num)
        }
        return num;
    }
    let setDate = (value) => {
        let date = new Date(Date.parse(value));
        let day = formatter(date.getDate());
        let month = formatter(date.getMonth() + 1);
        let year = date.getFullYear();
        props.setDate(value);
        props.requestQuotes(year + "-" + month + "-" + day);
    }

    return (
        <div className={s.departures}>
            <div className={s.departuresHeader}>
                <div className={s.exit} onClick={()=> props.setToken({"token":""})}>
                    <span>Выйти</span>
                    <img src={logout} alt="logout" height={18}/>
                </div>
            </div>
            <div className={s.departuresCont}>
                <div className={s.title}>
                    <div>
                        <span className={s.titleSpan}>Вылеты</span>
                        <img src={arrow2} alt="" height={18}/>
                        <span className={s.titleSpan}>SVO - JFK</span>
                    </div>
                    <div className={s.date}>
                        <span
                              onClick={() => setVisibleCalendar(true)}>{new Date(Date.parse(props.date)).toDateString()}</span>
                        <img src={calendar} alt="" width={18}/>
                    </div>
                    {visibleCalendar && <div className={s.calendar}>
                        <Calendar
                            onClickDay={(value) => {
                                setDate(value);
                                setVisibleCalendar(false)
                            }}
                            locale={"ru-RU"}
                            onChange={onChange}
                            value={props.date}
                            minDate={new Date()}
                        />
                    </div>}
                </div>
                <div className={s.slider}>
                    <Slider {...settings}>
                        {props.photos.map(p => <div key={p} style={s.slickBlock}>
                            <div className={s.carouselImg} style={{backgroundImage: `url(${p})`}}></div>
                        </div>)}
                    </Slider>
                </div>
                <div className={s.likes}>
                    <span>Добавлено в Избранное:</span>
                    <span style={{color:"#1157A7", fontWeight:"bold", margin:"0 10px"}}>{props.likes}</span>
                    <span>рейсов</span>
                </div>
                {props.quotes.Quotes && props.quotes.Quotes.map(q =>
                    <Flight favorites={props.favorites} removeFromFavorites={props.removeFromFavorites} addToFavorites={props.addToFavorites} key={q.QuoteId} quote={q} Carriers={props.quotes.Carriers}
                            places={props.places}  symbol={props.symbol}/>)}
            </div>
        </div>
    );
}
export default Departures;