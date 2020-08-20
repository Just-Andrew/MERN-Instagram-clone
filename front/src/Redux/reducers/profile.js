import { usersAPI } from "../../DAL/api"
import { toggleLoader } from "../actions/app"
import { setCurrentUser } from "../actions/profile"

const InitialState = {
    currentUser: null
}

export const getCurrentUser = username => async dispatch => {
    dispatch(toggleLoader(true))
    const res = await usersAPI.getSpecificUser(username)
    const user = res.user
    console.log(user)
    dispatch(setCurrentUser(user))
    dispatch(toggleLoader(false))
}

const profileReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET-CURRENT-USER':
            return { ...state, currentUser: action.user }

        default: return state
    }
}

export default profileReducer