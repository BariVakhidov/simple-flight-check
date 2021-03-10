import React, {useState} from 'react';
import Calendar from 'react-calendar';
import s from "./Departures.module.css"
import 'react-calendar/dist/Calendar.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logout from "../../assets/images/logout.png";
import arrow2 from "../../assets/images/arrow2.png";
import Flight from "./Flight/Flight";
import calendar from "../../assets/images/calendar.png"
import Carousel from "./Carousel";
import Preloader from "../Common/Preloader";
import {departuresCount, formatter} from "../Common/functions";
import {useDispatch, useSelector} from "react-redux";
import {requestQuotes} from "../../redux/departures-reducer";

const Departures = (props) => {
    const dispatch = useDispatch();
    let quotes = useSelector(state => state.departures.quotes);

    const [value, onChange] = useState(new Date());
    const [visibleCalendar, setVisibleCalendar] = useState(false);

    const setDate = (value) => {
        let date = new Date(Date.parse(value));
        let day = formatter(date.getDate());
        let month = formatter(date.getMonth() + 1);
        let year = date.getFullYear();
        props.setDate(value);
        dispatch(requestQuotes(props.token, year + "-" + month + "-" + day));
    }

    return (
        <div className={s.departures}>
            <div className={s.departuresHeader}>
                <div className={s.exit} onClick={() => props.setToken({"token": ""})}>
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
                        <span style={{color: props.loading && "#a5a5a5"}}
                              onClick={props.loading ? undefined : () => setVisibleCalendar(true)}>{new Date(Date.parse(props.date)).toDateString()}</span>
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
                <Carousel photos={props.photos}/>
                <div className={s.likes}>
                    <span>Добавлено в Избранное:</span>
                    <span style={{color: "#1157A7", fontWeight: "bold", margin: "0 10px"}}>{props.likes}</span>
                    <span>{departuresCount(props.likes)}</span>
                </div>
                <div className={s.quotes}>
                    {((props.isLoading) && <Preloader/>) ||
                    ((!props.isLoading && !quotes && !props.dictionaries) &&
                        <div>Рейсов на выбранную дату нет</div>) ||
                    (quotes.map(q =>
                        <Flight favorites={props.favorites} dictionaries={props.dictionaries}
                                key={q.id} quote={q}
                                places={props.places} symbol={props.symbol}/>))}
                </div>
            </div>
        </div>
    );
}
export default Departures;