import {takeEvery, put, call} from "redux-saga/effects";
import {REQUEST_QUOTES, setQuotes} from "./departures-reducer";
import {quotesAPI} from "../api/api";

export function* sagaWatcher() {
    yield takeEvery(REQUEST_QUOTES, sagaWorker);
}

function* sagaWorker(action) {
    try {
        const payload = yield call(() => fetchQuotes(action.date));
        yield put(setQuotes(payload));
    }
    catch (error) {
        alert(error)
    }
}

const fetchQuotes = async (date) => {
    return await quotesAPI.getTickets(date);
}