import React, { useEffect } from 'react'
import './App.css'
import LoginPage from './Components/LoginPage/LoginPage'
import SignupPage from './Components/SignupPage/SignupPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from './Components/common/Header/Header'
import Profile from './Components/Profile/ProfileContainer'
import { connect } from 'react-redux'
import { authMe } from './Redux/reducers/app'
import Loader from './Components/Loader/Loader'


const App = props => {
  useEffect(() => {
    props.authMe()
  }, [])

  return (
    <div className="App">
      {props.loading
        ? <Loader />
        : <>
          <Route path='/signup' render={() => <SignupPage />} />
          <Route path='/login' render={() => <LoginPage />} />
          {props.isAuth
            ? <Switch>
              <Route path='/' render={() =>
                <>
                  <Header />
                  <Route path='/profile/:username' render={() => <Profile />} />
                  <Route exact path='/profile' render={() => <Redirect to={`/profile/${props.username}`} />} />
                </>
              } />
            </Switch>
            : <Redirect to='/login' />}
        </>}
    </div>

  )
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  isAuth: state.app.isAuth,
  username: state.app.authorizedUser && state.app.authorizedUser.username
})


export default connect(mapStateToProps, { authMe })(App)
