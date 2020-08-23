import { usersAPI, followAPI } from "../../DAL/api"
import { toggleLoader } from "../actions/app"
import { setCurrentUser, setFollowStatus, toggleFollowLoader } from "../actions/profile"

const InitialState = {
    currentUser: null,
    followLoading: false
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
    dispatch(toggleFollowLoader(false))
}

const profileReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET-CURRENT-USER':
            return { ...state, currentUser: action.user }

        case 'TOGGLE-FOLLOW-LOADER':
            return { ...state, followLoading: action.val }

        case 'SET-FOLLOW-STATUS':
            return { ...state, currentUser: { ...state.currentUser, followed: action.val } }

        default: return state
    }
}

export default profileReducer