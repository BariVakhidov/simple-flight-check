import {takeEvery, put, call} from "redux-saga/effects";
import {REQUEST_QUOTES, setDictionaries, setLoading, setQuotes, setToken} from "./departures-reducer";
import {quotesAPI} from "../api/api";

export function* sagaWatcher() {
    yield takeEvery(REQUEST_QUOTES, sagaWorker);
}

function* sagaWorker(action) {
    try {
        yield put(setLoading());
        const payload = yield call(() => fetchQuotes(action.token, action.date));
        yield put(setQuotes(payload.data));
        yield put(setDictionaries(payload.dictionaries));
        yield put(setLoading());
    }
    catch (error) {
        if (error.message === "Cannot read property 'access_token' of null") {
            try {
                const token = yield call(()=> fetchToken());
                yield put(setToken(token));
                const payload = yield call(() => fetchQuotes(token));
                yield put(setQuotes(payload.data));
                yield put(setDictionaries(payload.dictionaries));
                yield put(setLoading());
            }
            catch (tokenError) {
                alert(tokenError)
            }
        }
    }
}
const fetchQuotes = async (token,date) => {
    return await quotesAPI.getTickets(token, date);
}
const fetchToken = async () => {
    return await quotesAPI.getToken();
}