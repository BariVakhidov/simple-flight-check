import {takeEvery, put, call} from "redux-saga/effects";
import {REQUEST_QUOTES, setDictionaries, setLoading, setQuotes} from "./departures-reducer";
import {quotesAPI} from "../api/api";

export function* sagaWatcher() {
    yield takeEvery(REQUEST_QUOTES, sagaWorker);
}

function* sagaWorker(action) {
    try {
        yield put(setLoading());
        const token = yield call(()=> fetchToken());
        const payload = yield call(() => fetchQuotes(action.date, token));
        yield put(setQuotes(payload.data));
        yield put(setDictionaries(payload.dictionaries));
        yield put(setLoading());
    }
    catch (error) {
        alert(error)
    }
}

const fetchQuotes = async (date, token) => {
    return await quotesAPI.getTickets(date, token);
}
const fetchToken = async () => {
    return await quotesAPI.getToken();
}