import React from 'react'
import styles from './Loader.module.css'
import loader from '../../assets/gifs/instagram-loader.gif'

const Loader = () => {
    return (
        <div className={styles.Wrapper}>
            <img src={loader} alt="" />
        </div>
    )
}

export default Loader
