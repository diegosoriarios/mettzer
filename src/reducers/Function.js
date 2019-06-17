import { 
    USER_IS_LOGGED,
    PAGE_IS_LOADING,
    LOAD_MORE,
    FETCH_SUCCESS,
    FETCH_ERROR,
    CHANGE_STRING
} from '../actions/Types'

export const initialState = {
    isLogged: true,
    isLoading: false,
    pesquisa: '',
    response: [],
    page: 1,
    query: '',
    error: ''
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

export function loadMore(state = initialState, action) {
    switch(action.type) {
        case LOAD_MORE:
            return {
                ...state,
                page: state.page + 1,
            }
        default:
            return state
    }
}

export function changeString(state = initialState, action) {
    switch(action.type) {
        case CHANGE_STRING:
            return {
                ...state,
                query: action.query
            }
        default:
            return state
    }
}

export function fetchSuccess(state = initialState, action) {
    switch(action.type) {
        case FETCH_SUCCESS:
            return {
                ...state,
                response: action.response
            }
        default:
            return state
    }
}

export function fetchError(state = initialState, action) {
    switch(action.type) {
        case FETCH_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}