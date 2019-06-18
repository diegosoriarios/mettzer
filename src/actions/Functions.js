import {
    USER_IS_LOGGED,
    PAGE_IS_LOADING,
    FETCH_API,
    LOAD_MORE,
    FETCH_SUCCESS,
    FETCH_ERROR,
    CHANGE_STRING,
    SAVE_USER,
    CREATE_ACCOUNT
} from './Types'
import axios from 'axios'
import { initialState } from '../reducers/Function'

const API_KEY = 'Y8npoHmwdkq6xWJMBRcyvF2i4h5Te1tV'

export function userIsLogged(bool) {
    return {
        type: USER_IS_LOGGED,
        isLogged: bool
    }
}

export function pageIsLoading(bool) {
    return {
        type: PAGE_IS_LOADING,
        isLoading: bool
    }
}

export function loadMore(page) {
    return {
        type: LOAD_MORE,
        page: page
    }
}

export function fetchSuccess(response) {
    return {
        type: FETCH_SUCCESS,
        response: response
    }
}

export function fetchError(error) {
    return {
        type: FETCH_ERROR,
        error: error
    }
}

export function changeString(string) {
    return {
        type: CHANGE_STRING,
        query: string
    }
}

export function saveUser(user) {
    return {
        type: SAVE_USER,
        user: user
    }
}

export function createAccount(bool) {
    return {
        type: CREATE_ACCOUNT,
        createAccount: bool
    }
}

export function fetchApi(query, page) {
    return function action(dispatch) {
        dispatch({type: FETCH_API})
        dispatch(pageIsLoading(true))
        if(initialState.query !== query) {
            dispatch(fetchSuccess([]))
        }
        
        let values = []

        const request = axios.get(`https://core.ac.uk/api-v2/search/${query}?page=1&pageSize=${page}0&apiKey=${API_KEY}`)
        .then(response => {
            response.data.data.forEach(obj => {
                values.push(obj._source)
            })
        })


        dispatch(pageIsLoading(false))
        return request.then(
            response => dispatch(fetchSuccess(values)),
            err => dispatch(fetchError(err))
        )
    }
}