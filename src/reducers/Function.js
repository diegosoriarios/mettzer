import { 
    USER_IS_LOGGED,
    PAGE_IS_LOADING
} from '../actions/Types'

const initialState = {
    isLogged: false,
    isLoading: false
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

export function pageIsLoading(state = initialState, action) {
    switch(action.type) {
        case PAGE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state
    }
}