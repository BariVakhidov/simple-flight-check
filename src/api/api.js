import axios from "axios";
const instance = axios.create({
    baseURL: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/',
    headers: {
        'x-rapidapi-key': 'f061b5aed2msh845f4a7c5c1c83dp151aebjsn88a52b7640ee',
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
    }
});
let dateInit = "2021-03-15";

export const quotesAPI = {
    getTickets (date = dateInit) {
       return (instance.get(`browsequotes/v1.0/RU/RUB/ru-RU/JFK-sky/SVO-sky/${date}`).then(response => response.data))
    }
}