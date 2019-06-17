import { combineReducers } from 'redux'
import { userIsLogged, pageIsLoading, loadMore, fetchSuccess, changeString } from './Function'

export default combineReducers({
    userIsLogged,
    pageIsLoading,
    loadMore,
    fetchSuccess,
    changeString
})