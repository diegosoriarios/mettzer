import { 
    USER_IS_LOGGED,
    PAGE_IS_LOADING,
    LOAD_MORE,
    FETCH_SUCCESS,
    FETCH_ERROR,
    CHANGE_STRING,
    SAVE_USER,
    CREATE_ACCOUNT
} from '../actions/Types'

export const initialState = {
    isLogged: false,
    isLoading: false,
    signin: false,
    pesquisa: '',
    response: [],
    page: 1,
    query: '',
    error: '',
    user: {}
}

export function getUserFunction(state = initialState, action) {
    switch(action.type) {
        case USER_IS_LOGGED:
            return {
                ...state,
                isLogged: action.isLogged
            }
        case PAGE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case LOAD_MORE:
            return {
                ...state,
                page: state.page + 1,
            }
        case CHANGE_STRING:
            return {
                ...state,
                query: action.query
            }
        case SAVE_USER:
            return {
                ...state,
                user: action.user
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                response: action.response
            }
        case CREATE_ACCOUNT:
            return {
                ...state,
                signin: action.createAccount
            }
        case FETCH_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}