export const setAuthStatus = val => ({ type: 'SET-AUTH-STATUS', val })
export const setAuthorizedUserData = data => ({ type: 'SET-AUTHORIZED-USER-DATA', data })
export const setCurrentUser = user => ({ type: 'SET-CURRENT-USER', user })
export const setFollowStatus = (username, val) => ({type: 'SET-FOLLOW-STATUS', val, username})
export const setFoundUsers = users => ({ type: 'SET-FOUND-USERS', users })

export const toggleLoader = val => ({ type: 'TOGGLE-LOADER', val })
export const toggleFollowLoader = val => ({type: 'TOGGLE-FOLLOW-LOADER', val})
export const toggleInputLoader = val => ({ type: 'TOGGLE-INPUT-LOADER', val })