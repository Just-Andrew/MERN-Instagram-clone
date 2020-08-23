import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Profile from './Profile'
import { withRouter } from 'react-router-dom'
import { getCurrentUser, follow } from '../../Redux/reducers/profile'


const ProfileContainer = props => {
    const [currentUser, setCurrentUser] = useState(props.currentUser)
    const [profileBelongsToAuthorizedUser,
        setProfileBelongsToAuthorizedUser]
        = useState(props.match.params.username === props.username)

    useEffect(() => {
        if (props.authorizedUser.username === props.match.params.username) setProfileBelongsToAuthorizedUser(true)
        else setProfileBelongsToAuthorizedUser(false)
        if (props.match.params.username !== currentUser.username) {
            props.getCurrentUser(props.match.params.username)
        }
        setCurrentUser(props.currentUser)
    }, [props.match.params.username, props.currentUser])
    return (
        <div>
            <Profile  profileBelongsToAuthorizedUser={profileBelongsToAuthorizedUser}
                currentUser={currentUser} follow={props.follow} />
        </div>
    )
}

const mapStateToProps = state => ({
    authorizedUser: state.app.authorizedUser,
    currentUser: state.profile.currentUser
})

export default compose(
    withRouter,
    connect(mapStateToProps, { getCurrentUser, follow }),
)(ProfileContainer)
