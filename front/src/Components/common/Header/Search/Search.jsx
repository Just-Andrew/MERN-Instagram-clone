import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMatchedUsers } from '../../../../Redux/reducers/users'
import { NavLink } from 'react-router-dom'
/* assets */
import NoAvatarIcon from '../../../../assets/icons/no_avatar_icon.jpg'
/* styles */
import styles from './Search.module.css'

export const Search = props => {
    const [searchValue, setSearchValue] = useState('')
    const [resultsMenuDisplay, setResultsMenuDisplay] = useState('none')
    const [mouseIsOver, setMouseIsOver] = useState(false)
    const dispatch = useDispatch()
    const foundUsers = useSelector(state => state.users.lastlyFoundUsers)
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
                            dispatch(getMatchedUsers(val))
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
                    {!!foundUsers
                        ? foundUsers.length > 0
                            ? foundUsers.map(u =>
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
