import { Button, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../Actions/User";
import "./ForgetPassword.css";

const ForgetPassword = () => {
   const [email, setEmail] = useState("");

   const dispatch = useDispatch();
   const alert = useAlert();
   const { error, loading, message } = useSelector(state => state.like);

   const forgetPasswordHandler = (e) => {
      e.preventDefault();
      dispatch(forgetPassword(email));
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
      <div className="forgetPassword">
         <form className="forgetPasswordForm" onSubmit={forgetPasswordHandler}>
            <Typography variant="h3" style={{ padding: "2vmax" }}>
               Social Media App
            </Typography>

            <input
               type="email"
               placeholder="Email"
               value={email}
               className="forgetPasswordInputs"
               onChange={(e) => setEmail(e.target.value)}
               required
            />

            {loading ? <CircularProgress /> :
               <Button type="submit">Send Login Link</Button>
            }

            <Link to="/">
               <Typography>Go back to Login</Typography>
            </Link>

         </form>
      </div>
   );
};

export default ForgetPassword;