import { setAuthStatus, setAuthorizedUserData, toggleLoader, setCurrentUser } from '../actions/actions'
import { appAPI } from '../../DAL/api'
import { removeArrayItemByValue } from '../../helpers/removeArrayItemByValue'

export const signUp = data => async dispatch => {
    dispatch(toggleLoader(true))
    const res = await appAPI.signup(data)
    dispatch(setAuthorizedUserData(res.user))
    dispatch(setCurrentUser(res.user))
    dispatch(setAuthStatus(true))
    localStorage.setItem("token", res.token)
    dispatch(toggleLoader(false))
}

export const logIn = data => async dispatch => {
    dispatch(toggleLoader(true))
    const res = await appAPI.login(data)
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
    if (res && res.authorized) {
        dispatch(setAuthorizedUserData(res.user))
        dispatch(setCurrentUser(res.user))
        dispatch(setAuthStatus(true))
        localStorage.setItem('authorizedUserUsername', res.user.username)
    }
    dispatch(toggleLoader(false))
}

export const logOut = () => dispatch => {
    localStorage.removeItem('token')
    localStorage.removeItem('authorizedUserUsername')
    dispatch(setAuthorizedUserData({
        avatar: null,
        description: null,
        email: null,
        followers: null,
        follows: null,
        fullname: null,
        posts: null,
        username: null,
        _id: null
    }))
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

        case 'SET-FOLLOW-STATUS':
            let copiedUser = { ...state.authorizedUser }
            if (action.val) {
                copiedUser.follows.push(action.username)
            } else {
                copiedUser.follows = removeArrayItemByValue(copiedUser.follows, action.username)
            }
            return { ...state, authorizedUser: { ...copiedUser } }

        default: return state
    }
}

export default appReducer