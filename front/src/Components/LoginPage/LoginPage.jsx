import React from 'react'
import styles from './LoginPage.module.css'
import classNames from 'classnames'
import phone from '../../assets/pictures/phones.png'
import LoginForm from './LoginForm/LoginForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const LoginPage = props => {
    return (
        <>
            {props.isAuth
                ? <Redirect to={`/profile/${props.username}`} />
                : <div className={styles.Wrapper}>
                    <div className={styles.formBlock}>
                        <div className={classNames(styles.formBlockItem, styles.phoneImg)}>
                            <img src={phone} alt="" />
                        </div>
                        <div className={styles.formBlockItem}>
                            <LoginForm />
                        </div>
                    </div>
                </div>}
        </>
    )
}

const mapStateToProps = state => ({
    isAuth: state.app.isAuth,
    username: state.app.authorizedUser && state.app.authorizedUser.username
})

export default connect(mapStateToProps, {})(LoginPage)