import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authMe } from './Redux/reducers/app'
/* styles */
import './App.css'
/* components */
import LoginPage from './Components/LoginPage/LoginPage'
import SignupPage from './Components/SignupPage/SignupPage'
import Header from './Components/common/Header/Header'
import Profile from './Components/Profile/Profile'
import Loader from './Components/Loader/Loader'

export const App = props => {
  const [loading, username, isAuth] = useSelector(state => [state.app.loading, state.app.authorizedUser.username, state.app.isAuth])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authMe())
  }, [])

  return (
    <div className="App">
      {loading
        ? <Loader />
        : <>
          <Route path='/signup' render={() => <SignupPage />} />
          <Route path='/login' render={() => <LoginPage />} />
          {isAuth
            ? <Switch>
              <Route path='/' render={() =>
                <>
                  <Header />
                  <Route path='/profile/:username' render={() => <Profile />} />
                  <Route exact path='/profile' render={() => <Redirect to={`/profile/${username}`} />} />
                </>
              } />
            </Switch>
            : <Redirect to='/login' />}
        </>}
    </div>
  )
}

