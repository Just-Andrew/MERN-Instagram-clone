import { setFoundUsers, toggleInputLoader } from '../actions/search'
import { usersAPI } from '../../DAL/api'

const InitialState = {
    foundUsers: null,
    loading: false
}

export const getMatchedUsers = username => async dispatch => {
    dispatch(toggleInputLoader(true))
    const res = await usersAPI.searchForUsers(username)
    dispatch(setFoundUsers(res.users))
    dispatch(toggleInputLoader(false))
}

const searchReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET-FOUND-USERS':
            return { ...state, foundUsers: action.users }

        case 'TOGGLE-INPUT-LOADER':
            return { ...state, loading: action.val }

        default: return state
    }
}

export default searchReducer