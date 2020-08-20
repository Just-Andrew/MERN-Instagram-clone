import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Profile from './Profile'
import { withRouter } from 'react-router-dom'
import { getCurrentUser } from '../../Redux/reducers/profile'


const ProfileContainer = props => {
    const [currentUser, setCurrentUser] = useState(props.currentUser)
    const [profileBelongsToAuthorizedUser,
        setProfileBelongsToAuthorizedUser]
        = useState(props.match.params.username === props.username)

    useEffect(() => {
        if (props.myUsername === props.match.params.username) setProfileBelongsToAuthorizedUser(true)
        else setProfileBelongsToAuthorizedUser(false)
        if (props.match.params.username !== currentUser.username) {
            props.getCurrentUser(props.match.params.username)
        }
        setCurrentUser(props.currentUser)
    }, [props.match.params.username])
    return (
        <div>
            <Profile {...props} profileBelongsToAuthorizedUser={profileBelongsToAuthorizedUser}
                currentUser={currentUser} />
        </div>
    )
}

const mapStateToProps = state => ({
    avatar: state.app.authorizedUser.avatar,
    myUsername: state.app.authorizedUser.username,
    myFullname: state.app.authorizedUser.fullname,
    currentUser: state.profile.currentUser
})

export default compose(
    connect(mapStateToProps, { getCurrentUser }),
    withRouter
)(ProfileContainer)
