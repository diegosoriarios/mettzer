import { combineReducers } from 'redux'
import { userIsLogged, pageIsLoading } from './Function'

export default combineReducers({
    userIsLogged,
    pageIsLoading
})