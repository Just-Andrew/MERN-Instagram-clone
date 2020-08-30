import React from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
/* assets */
import instagram_logo from '../../../assets/icons/instagram_logo.png'
/* components */ 
import { Navbar } from './Navbar/Navbar'
import { Search } from './Search/Search'
/* styles */
import styles from './Header.module.css'


const Header = props => {
    return (
        <div className={styles.headerWrapper}>
            <header className={styles.Wrapper}>
                <div className={styles.mainBlock}>
                    <div className={styles.logo}>
                        <img src={instagram_logo} alt="" />
                    </div>
                    <Search location={props.location} getMatchedUsers={props.getMatchedUsers} />
                    <Navbar />
                </div>
            </header>
        </div >
    )
}

export default compose(
    withRouter
)(Header)
