import axios from "axios";
import qs from 'qs';
import {formatter} from "../components/Common/functions";
const instance = axios.create({
    baseURL: 'https://test.api.amadeus.com/v2/',
    crossDomain: true
});


let data = {
    grant_type: "client_credentials",
    client_id: 'usWwh1uvAI8afmUpGqDZIGEamoNSvX1n',
    client_secret: 'pg1xmG1wJK0CewMu'}

const instance2 = axios.create({
    baseURL: 'https://test.api.amadeus.com/v1/security/oauth2/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

let curDate = new Date();
let day = formatter(curDate.getDate());
let month = formatter(curDate.getMonth() + 1);
let year = curDate.getFullYear();
let dateInit = /*"2021-03-15"*/ year + "-" + month + "-" + day;

export const quotesAPI = {
    getTickets (date = dateInit,token) {
           return (instance.get(`shopping/flight-offers?originLocationCode=SVO&destinationLocationCode=JFK&departureDate=${date}&adults=1&nonStop=false&max=250&currencyCode=RUB`,
               {headers: {
                       Authorization: `Bearer ${token.access_token}`
                   }} ).then(response => response.data))
    },
    getToken () {
        return (instance2.post("token",qs.stringify(data)).then(response => response.data));
    }
}