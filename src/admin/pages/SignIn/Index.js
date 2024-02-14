import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import classes from './SingIn.module.css';

const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required()
})

const SignIn = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const signInHandler = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            const token = response.user.accessToken;
            const userId = response._tokenResponse.localId;
            const userName = response.user.displayName;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            navigate('/add-showjumping-event');
        } catch (error) {
            console.log(error)
        }
    }

    const submitForm = (data) => {
        console.log(data)
        const { email, password } = data;
        if (email === 'admin@gmail.com') {
            signInHandler(email, password);
        }else {
            setErrorMessage("You are not admin!");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    // const userNameForDb = localStorage.getItem("userName")



    return (

        <div className={classes.background}>
        <div className={classes.headerContainer}>
          <h1 className={classes.homePageHeader}>
            Admin Page 
            {/* <img src={dollarSign} alt="dollar-sign" className={classes.img} /> */}
          </h1>
           {/* herer */}

        <div className={classes.signInForm}>
            <form className={classes.form} onSubmit={handleSubmit(submitForm)} >
                <div>
                    <h1 className={classes.logInHeader}>Sign In</h1>
                </div>
                <div className={classes.formContainer}>
                    <label>Email <p className={classes.errorMessage}>{errors.email?.message}</p></label>
                    <input type='email' name='email' placeholder='Enter your email'  {...register('email')} className={classes.inputs}></input>
                    <label>Password <p className={classes.errorMessage}>{errors.password?.message} </p></label>
                    <input type='password' name='password' placeholder='Enter your password' {...register('password')} className={classes.inputs}></input>
                </div>
                <br />
                {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                <button className={classes.button} type='submit'>submit</button>
                {/* <p className={classes.redirectInSingUp}>Don't have an account? <Link className={classes.link} to={``}>Submit</Link></p> */}
            </form>
        </div>


        </div>
      </div>

        
    )
}

export default SignIn;