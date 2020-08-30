import {
    setFoundUsers,
    toggleInputLoader,
    toggleLoader,
    setCurrentUser,
    toggleFollowLoader,
    setFollowStatus
} from '../actions/actions'
import { usersAPI, followAPI } from '../../DAL/api'

const InitialState = {
    lastlyFoundUsers: [],
    everFoundUsers: [],
    loading: false,
    followLoading: false
}

export const getMatchedUsers = username => async dispatch => {
    dispatch(toggleInputLoader(true))
    const res = await usersAPI.searchForUsers(username)
    dispatch(setFoundUsers(res.users))
    dispatch(toggleInputLoader(false))
}


export const getCurrentUser = username => async dispatch => {
    dispatch(toggleLoader(true))
    const res = await usersAPI.getSpecificUser(username)
    dispatch(setCurrentUser(res.user))
    dispatch(toggleLoader(false))
}

export const follow = (username, val) => async dispatch => {
    dispatch(toggleFollowLoader(true))
    const res = await followAPI.follow(username, val)
    dispatch(setFollowStatus(res.data.followed))
    dispatch(toggleFollowLoader(username, val))
}

const searchReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET-FOUND-USERS':
            return { ...state, lastlyFoundUsers: action.users, everFoundUsers: [action.users, ...state.everFoundUsers] }

        case 'SET-CURRENT-USER':
            return { ...state, everFoundUsers: [action.user, ...state.everFoundUsers] }

        case 'TOGGLE-INPUT-LOADER':
            return { ...state, loading: action.val }

        case 'TOGGLE-FOLLOW-LOADER':
            return { ...state, followLoading: action.val }

        case 'SET-FOLLOW-STATUS':
            const modifiedUsers = state.everFoundUsers
                .map(u => u.username === action.username ? { ...u, followed: action.val } : u)
            return { ...state, everFoundUsers: [...modifiedUsers] }

        default: return state
    }
}

export default searchReducer