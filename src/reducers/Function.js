import { USER_IS_LOGGED } from '../actions/Types'

const initialState = {
    isLogged: false
}

export function userIsLogged(state = initialState, action) {
    switch(action.type) {
        case USER_IS_LOGGED:
            return {
                ...state,
                isLogged: action.isLogged
            }
        default:
            return state
    }
}