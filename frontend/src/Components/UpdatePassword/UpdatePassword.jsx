import React, { useEffect } from "react";
import { Typography, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";
import { useAlert } from "react-alert";
import "./UpdatePassword.css";

const UpdatePassword = () => {
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");

   const dispatch = useDispatch();
   const alert = useAlert();

   const { loading, error, message } = useSelector(state => state.like);

   const updatePasswordHadler = (e) => {
      e.preventDefault();
      dispatch(updatePassword(oldPassword, newPassword));
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
      <div className="updatePassword">
         <form className="updatePasswordForm" onSubmit={updatePasswordHadler}>
            <Typography variant="h3" style={{ padding: "2vmax" }}>
               Social Media App
            </Typography>

            <input
               type="password"
               placeholder="Old Password"
               value={oldPassword}
               className="updatePasswordInputs"
               onChange={(e) => setOldPassword(e.target.value)}
               required
            />

            <input
               type="password"
               placeholder="New Password"
               value={newPassword}
               className="updatePasswordInputs"
               onChange={(e) => setNewPassword(e.target.value)}
               required
            />

            {loading ? <CircularProgress /> :
               <Button type="submit">Change Password</Button>
            }

         </form>
      </div>
   );
};

export default UpdatePassword;
