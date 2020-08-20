import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './LogSignTile.module.css'

const LogSignTile = props => {
    return (
        <div className={styles.RegLogBlock}>
            <p>{props.text} <NavLink to={`/${props.href}`}>{props.link}</NavLink></p>
        </div>
    )
}

export default LogSignTile