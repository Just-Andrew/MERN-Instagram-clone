import { setAuthStatus, setAuthorizedUserData, toggleLoader } from '../actions/app'
import { appAPI } from '../../DAL/api'
import { setCurrentUser } from '../actions/profile'

export const signUp = data => async dispatch => {
    dispatch(toggleLoader(true))
    const res = await appAPI.signup(data)
    console.log(res.user)
    dispatch(setAuthorizedUserData(res.user))
    dispatch(setCurrentUser(res.user))
    dispatch(setAuthStatus(true))
    localStorage.setItem("token", res.token)
    dispatch(toggleLoader(false))
}

export const logIn = data => async dispatch => {
    dispatch(toggleLoader(true))
    const res = await appAPI.login(data)
    console.log(res)
    if (res.resultCode < 1) {
        dispatch(setAuthorizedUserData(res.user))
        dispatch(setCurrentUser(res.user))
        dispatch(setAuthStatus(true))
        localStorage.setItem("token", res.token)
    }
    dispatch(toggleLoader(false))
}

export const authMe = () => async dispatch => {
    dispatch(toggleLoader(true))
    const res = await appAPI.authMe()
    console.log(res)
    if (res && res.authorized) {
        dispatch(setAuthorizedUserData(res.user))
        dispatch(setCurrentUser(res.user))
        dispatch(setAuthStatus(true))
    }
    console.log(res)
    dispatch(toggleLoader(false))
}

export const logOut = () => dispatch => {
    localStorage.removeItem('token')
    dispatch(setAuthorizedUserData(null))
    dispatch(setAuthStatus(false))
}

const InitialState = {
    isAuth: false,
    authorizedUser: {
        avatar: null,
        description: null,
        email: null,
        followers: null,
        follows: null,
        fullname: null,
        posts: null,
        username: null,
        _id: null
    },
    loading: true
}

const appReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET-AUTH-STATUS':
            return { ...state, isAuth: action.val }

        case 'SET-AUTHORIZED-USER-DATA':
            return { ...state, authorizedUser: action.data }

        case 'TOGGLE-LOADER':
            return { ...state, loading: action.val }

        default: return state
    }
}

export default appReducer