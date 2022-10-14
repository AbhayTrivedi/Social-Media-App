import React, { useEffect } from 'react';
import { Typography, Button, CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../Actions/User';
import { useAlert } from "react-alert";
import "./Login.css";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const alert = useAlert();

   const { error, loading } = useSelector(state => state.user);
   const { message } = useSelector(state => state.like);

   const loginHadler = (e) => {
      e.preventDefault();
      dispatch(loginUser(email, password));
   };

   useEffect(() => {
      if (error) {
         alert.error(error);
         dispatch({ type: "clearError" });
      }
      if (message) {
         alert.success(message);
         dispatch({ type: "clearMessage" });
      }
   }, [dispatch, alert, error, message]);

   return (
      <div className='login'>
         <form className='loginForm' onSubmit={loginHadler}>
            <Typography variant='h3' style={{ padding: "2vmax" }}>
               Social Media App
            </Typography>

            <input
               type='email'
               placeholder='Email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />

            <input
               type='password'
               placeholder='Password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />

            <Link to="/password/forgot">
               <Typography>Forget Password?</Typography>
            </Link>

            {loading ? <CircularProgress /> :
               <Button type='submit'>Login</Button>
            }

            <Link to="/register">
               <Typography>New User?</Typography>
            </Link>
         </form>
      </div>
   );
};

export default Login;
