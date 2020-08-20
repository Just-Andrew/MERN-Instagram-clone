import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import app from './reducers/app'
import search from './reducers/search'
import profile from './reducers/profile'

const reducers = combineReducers({
    app,
    search,
    profile
})

const store = createStore(reducers, compose(
    applyMiddleware(ThunkMiddleware)
))

window.store = store

export default store