import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import app from './reducers/app'
import users from './reducers/users'

const reducers = combineReducers({
    app,
    users,
})

const store = createStore(reducers, compose(
    applyMiddleware(ThunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

window.store = store

export default store