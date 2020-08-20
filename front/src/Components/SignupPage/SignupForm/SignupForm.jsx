import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './SignupForm.module.css'
import InstagramHeading from '../../common/Login-Signup_forms/InstagramHeading/InstagramHeading'
import OrTile from '../../common/Login-Signup_forms/OrTile/OrTile'
import LogSignTile from '../../common/Login-Signup_forms/LogSignTile/LogSignTile'
import GetTheApp from '../../common/Login-Signup_forms/GetTheApp/GetTheApp'
import facebook_icon from '../../../assets/icons/facebook_icon2.png'
import { signUp } from '../../../Redux/reducers/app'
import { connect } from 'react-redux'

const SignupForm = props => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        console.log(data)
        props.signUp(data)
    }

    return (
        <div className={styles.Wrapper}>
            <div className={styles.formWrapper}>
                <InstagramHeading />
                <h2 className={styles.h2}>Sign up to see photos and videos from your friends.</h2>
                <div className={styles.btnBlock}>
                    <button className={styles.useFacebookBtn}>
                        <img src={facebook_icon} alt="" />
                        Log In with Facebook
                    </button>
                </div>
                <OrTile />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputWrapper}>
                        <input name="email" placeholder="Email"
                            ref={register({ required: true, min: 8, max: 64 })}
                            type="email" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <input name="fullname" placeholder="Full Name"
                            ref={register({ required: true, min: 4, max: 64 })} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <input name="username" placeholder="Username"
                            ref={register({ required: true, min: 4, max: 64 })} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <input name="password"
                            ref={register({ required: true, min: 8, max: 64 })}
                            type="password"
                            placeholder="Password" />
                    </div>
                    <div>
                        <button className={styles.authBtn}>Sign Up</button>
                    </div>
                </form>
                <div className={styles.useFacebookBlock}>
                </div>
                <div className={styles.policy}>
                    By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                </div>
            </div>
            <LogSignTile text={`Have an account? `} link={`Log In`} href='login' />
            <GetTheApp />
        </div>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { signUp })(SignupForm)
