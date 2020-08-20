import React from 'react'
import styles from './SignupPage.module.css'
import SignupForm from './SignupForm/SignupForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const SignupPage = props => {
    return (
        <>
            {props.isAuth
                ? <Redirect to={`/profile/${props.username}`} />
                : <div className={styles.Wrapper}>
                    <div className={styles.formBlock}>
                        <div className={styles.formBlockItem}>
                            <SignupForm />
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

export default connect(mapStateToProps, {})(SignupPage)
