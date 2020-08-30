import React from 'react'
import styles from './ContentTumblers.module.css'
import classNames from 'classnames'

export const ContentTumblers = props => {
    const tumblerStyles = {
        borderTop: "3px solid black"
    }
    return (
        <div className={styles.contentTumblerWrapper}>
            <div className={styles.contentTumblerBlock}>
                <div className={styles.tumbler} style={tumblerStyles}>POSTS</div>
                <div className={styles.tumbler}>IGTV</div>
                <div className={classNames(styles.tumbler, styles.lastTumbler)}>TAGGED</div>
            </div>
        </div>
    )
}