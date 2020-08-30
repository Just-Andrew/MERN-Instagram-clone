import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser, follow } from '../../Redux/reducers/users'
import { withRouter } from 'react-router-dom'

import styles from './Profile.module.css'

/* components */ 
import { ContentTumblers } from './ContentTumblers/ContentTumblers'
import { ProfileHeader } from './ProfileHeader/ProfileHeader'
import { Posts } from './Posts/Posts'



const Profile = props => {
    const [isProfileMine, setProfileBelonging] = useState()
    const dispatch = useDispatch()
    const authorizedUser = useSelector(state => state.app.authorizedUser)
    const currentUser = useSelector(
        state => authorizedUser.username !== props.match.params.username
            ? state.users.everFoundUsers.find(el => el.username === props.match.params.username)
            : authorizedUser) || dispatch(getCurrentUser(props.match.params.username))


    useEffect(() => {
        setProfileBelonging(props.match.params.username === authorizedUser.username)
    }, [props.match.params.username])

    return (
        <main className={styles.Wrapper}>
            <div className={styles.contentBlock}>
                <ProfileHeader profileBelongsToAuthorizedUser={isProfileMine}
                    currentUser={currentUser} follow={(username, val) => dispatch(follow(username, val))} />

                <div className={styles.savedStories}></div>
                <ContentTumblers />
                <Posts posts={currentUser.posts} />
            </div>
        </main>
    )
}

export default withRouter(Profile)