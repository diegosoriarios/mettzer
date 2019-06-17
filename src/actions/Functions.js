import {
    USER_IS_LOGGED,
    PAGE_IS_LOADING
} from './Types'

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