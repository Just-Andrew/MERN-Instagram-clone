/* Action Creators */
export const setAuthStatus = val => ({ type: 'SET-AUTH-STATUS', val })

export const setAuthorizedUserData = data => ({ type: 'SET-AUTHORIZED-USER-DATA', data })

export const toggleLoader = val => ({ type: 'TOGGLE-LOADER', val })
