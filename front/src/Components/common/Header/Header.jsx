import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import instagram_logo from '../../../assets/icons/instagram_logo.png'
import { connect } from 'react-redux'
import Navbar from './Navbar/Navbar'
import { logOut } from '../../../Redux/reducers/app'
import { getMatchedUsers } from '../../../Redux/reducers/search'
import { compose } from 'redux'
import { withRouter, NavLink } from 'react-router-dom'
import NoAvatarIcon from '../../../assets/icons/no_avatar_icon.jpg'

const Search = props => {
    const [searchValue, setSearchValue] = useState('')
    const [resultsMenuDisplay, setResultsMenuDisplay] = useState('none')
    const [mouseIsOver, setMouseIsOver] = useState(false)

    useEffect(() => {
        setSearchValue('')
        setResultsMenuDisplay('none')
        setMouseIsOver(false)
    }, [props.location.pathname])
    return (
        <>
            <div className={styles.search} >
                <input placeholder="Search" value={searchValue}
                    onChange={e => {
                        const val = e.currentTarget.value.toLocaleLowerCase()
                        setSearchValue(val)
                        if (val !== '') {
                            props.getMatchedUsers(val)
                            setResultsMenuDisplay('flex')
                        } else {
                            setResultsMenuDisplay('none')
                        }
                    }}
                    onBlur={() => {
                        if (!mouseIsOver) {
                            setResultsMenuDisplay('none')
                        }
                    }}
                    onFocus={() => {
                        if (searchValue !== '') setResultsMenuDisplay('flex')
                    }}
                    className={styles.searchInput} />
                <div className={styles.dropDownSearchResult} style={{ display: resultsMenuDisplay }} tabIndex="10"
                    onMouseEnter={() => {
                        setMouseIsOver(true)
                    }}
                    onMouseLeave={() => {
                        setMouseIsOver(false)
                    }}>
                    {props.foundUsers !== null
                        ? props.foundUsers.length > 0
                            ? props.foundUsers.map(u =>
                                <NavLink to={`/profile/${u.username}`} key={u._id}>
                                    <div className={styles.userCard}>
                                        <div className={styles.avatar}>
                                            <img src={u.avatar ? u.avatar : NoAvatarIcon} alt="" />
                                        </div>
                                        <div className={styles.userInfo}>
                                            <div className={styles.username}>{u.username}</div>
                                            <div className={styles.fullname}>{u.fullname}</div>
                                        </div>
                                    </div >
                                </NavLink>)
                            : <div className={styles.noResults}> No results found. </div>
                        : ''}
                </div>
            </div>
        </>
    )
}

const Header = props => {
    return (
        <div className={styles.headerWrapper}>
            <header className={styles.Wrapper}>
                <div className={styles.mainBlock}>
                    <div className={styles.logo}>
                        <img src={instagram_logo} alt="" />
                    </div>
                    <Search location={props.location} getMatchedUsers={props.getMatchedUsers} foundUsers={props.foundUsers} />
                    <Navbar logOut={props.logOut}
                        username={props.username} />
                </div>
            </header>
        </div >
    )
}

const mapStateToProps = state => ({
    avatar: state.app.authorizedUser && state.app.authorizedUser.avatar,
    username: state.app.authorizedUser && state.app.authorizedUser.username,
    foundUsers: state.search.foundUsers
})

export default compose(
    connect(mapStateToProps, { logOut, getMatchedUsers }),
    withRouter
)(Header)
