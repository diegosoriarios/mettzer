import {
    USER_IS_LOGGED
} from './Types'

export function userIsLogged(bool) {
    return {
        type: USER_IS_LOGGED,
        isLogged: bool
    }
}