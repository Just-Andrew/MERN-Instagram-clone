import React from 'react'
import styles from './LoginForm.module.css'
import { useForm } from 'react-hook-form'
import facebook_icon from '../../../assets/icons/facebook_icon.png'
import GetTheApp from '../../common/Login-Signup_forms/GetTheApp/GetTheApp'
import OrTile from '../../common/Login-Signup_forms/OrTile/OrTile'
import LogSignTile from '../../common/Login-Signup_forms/LogSignTile/LogSignTile'
import InstagramHeading from '../../common/Login-Signup_forms/InstagramHeading/InstagramHeading'
import { connect } from 'react-redux'
import { logIn } from '../../../Redux/reducers/app'


const LoginForm = props => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        console.log(data)
        props.logIn(data)
    }

    return (
        <div className={styles.Wrapper}>
            <div className={styles.formWrapper}>
                <InstagramHeading />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputWrapper}>
                        <input name="email" placeholder="Email"
                            ref={register({ required: true })} />
                    </div>
                    <div className={styles.inputWrapper}>
                        <input name="password" placeholder="Password"
                            ref={register({ required: true })} />
                    </div>
                    <div>
                        <button className={styles.authBtn}>Log In</button>
                    </div>
                </form>
                <OrTile />
                <div className={styles.useFacebookBlock}>
                    <div>
                        <img src={facebook_icon} alt="" />
                    </div>
                    <div>
                        Log in with Facebook
                    </div>
                </div>
                <div className={styles.forgotPassword}>
                    <a>Forgot Password?</a>
                </div>
            </div>
            <LogSignTile text={`Don't have an account? `} link={`Sign Up`} href="signup" />
            <GetTheApp />
        </div>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { logIn })(LoginForm)