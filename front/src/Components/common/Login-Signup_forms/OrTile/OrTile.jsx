import React from 'react'
import styles from './OrTile.module.css'

const OrTile = () => {
    return (
        <div className={styles.or}>
            <hr className={styles.orLine}></hr>
            <div className={styles.orOpt}>OR</div>
            <hr className={styles.orLine}></hr>
        </div>
    )
}

export default OrTile