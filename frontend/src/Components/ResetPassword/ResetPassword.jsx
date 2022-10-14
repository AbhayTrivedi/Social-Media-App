import { Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/User";
import "./ResetPassword.css";

const ResetPassword = () => {
   const [newPassword, setNewPassword] = useState("");
   
   const dispatch = useDispatch();
   const alert = useAlert();
   const params = useParams();
   const { error, loading, message } = useSelector(state => state.like);

   const resetPasswordHadler = (e) => {
      e.preventDefault();
      dispatch(resetPassword(params.token, newPassword));
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
      <div className="resetPassword">
         <form className="resetPasswordForm" onSubmit={resetPasswordHadler}>
            <Typography variant="h3" style={{ padding: "2vmax" }}>
               Social Media App
            </Typography>

            <input
               type="password"
               placeholder="New Password"
               value={newPassword}
               className="resetPasswordInputs"
               onChange={(e) => setNewPassword(e.target.value)}
               required
            />

            <Link to="/"><Typography>Login?</Typography></Link>

            <Typography>or</Typography>

            <Link to="/password/forgot"><Typography>Get Another Link?</Typography></Link>

            {loading ? <CircularProgress /> :
            <Button type="submit">Reset Password</Button>
            }

         </form>
      </div>
   );
};

export default ResetPassword;