import React from 'react'
import google_play from '../../../../assets/icons/google_play_icon.png'
import app_store from '../../../../assets/icons/app_store_icon.png'
import styles from './GetTheApp.module.css'

const GetTheApp = props => {
    return (
        <div className={styles.downloadWrapper}>
            <div className={styles.txt}> Get the app </div>
            <div className={styles.download}>
                <div> <img src={app_store} alt="" /></div>
                <div> <img src={google_play} alt="" /></div>
            </div>
        </div>
    )
}

export default GetTheApp