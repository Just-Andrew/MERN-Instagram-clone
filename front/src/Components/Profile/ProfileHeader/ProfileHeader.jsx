import React from 'react'
import styles from './ProfileHeader.module.css'
import NoAvatarIcon from '../../../assets/icons/no_avatar_icon.jpg'
import { followAPI } from '../../../DAL/api'

const ProfileActivity = props => {
    const editBtnStyles = {
        background: 'white',
        border: '1px solid #dbdbdb',
        color: 'black'
    }
    const followBtnStyles = {
        background: '#0095f6',
        border: 'none',
        color: 'white'
    }

    return (
        <>
            {props.profileBelongsToAuthorizedUser
                ? <>
                    <button className={styles.followBtn} style={editBtnStyles} >
                        <b> Edit Profile</b>
                    </button>
                    <button className={styles.optionsBtn}>
                        <svg aria-label="Options" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z" fillRule="evenodd"></path></svg>
                    </button>
                </>
                : <> {!props.currentUser.followed
                    ? <button className={styles.followBtn} style={followBtnStyles}
                        onClick={() => props.follow(props.currentUser.username, true)}>
                        Follow
                    </button>
                    : <button className={styles.followBtn} style={followBtnStyles}
                        onClick={() => props.follow(props.currentUser.username, false)} >
                        Unfollow
                    </button>}
                    <button className={styles.optionsBtn}>
                        <svg aria-label="Options" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle></svg>
                    </button>
                </>}
        </>
    )
}


const ProfileHeader = props => {
    return (
        <header className={styles.profileStuff}>
            <div className={styles.avatarBlockWrapper}>
                <div className={styles.storyFrame}>
                    <div className={styles.avatarBlock}>
                        <img src={props.currentUser.avatar ? props.currentUser.avatar : NoAvatarIcon} alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.profileInfo}>
                <div className={styles.firstRow}>
                    <h2>{props.currentUser.username}</h2>
                    <span className={styles.tick}>✔</span>
                    <ProfileActivity {...props} />
                </div>
                <div className={styles.statistics}>
                    <span>
                        <span> 6,543 </span>
                        Posts
                    </span>
                    <a href={`/${props.currentUser.username}/followers`} onClick={e => e.preventDefault()}><span>52,458 </span> Followers</a>
                    <a href={`/${props.currentUser.username}/following`} onClick={e => e.preventDefault()}> <span>52</span> Following</a>
                </div>
                <div className={styles.stuff}>
                    <b className={styles.username}>{props.currentUser.fullname}</b>
                    <div className={styles.status}>{props.currentUser.description}</div>
                </div>
            </div>
        </header>
    )
}

export default ProfileHeader