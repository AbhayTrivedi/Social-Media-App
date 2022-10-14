import { Avatar, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../Actions/User";
import "./Register.css";

const Register = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [avatar, setAvatar] = useState("");
   const [password, setPassword] = useState("");

   const dispatch = useDispatch();
   const alert = useAlert();
   const { loading, error } = useSelector(state => state.user);

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      const Reader = new FileReader();

      Reader.readAsDataURL(file);

      Reader.onload = () => {
         if (Reader.readyState === 2) {
            setAvatar(Reader.result);
         }
      };
   };

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(registerUser(name, email, password, avatar));
   };

   useEffect(() => {
      if (error) {
         alert.error(error);
         dispatch({ type: "clearError" });
      }
   }, [dispatch, alert, error]);

   return (
      <div className="register">
         <form action="" className="registerForm" onSubmit={submitHandler}>

            <Typography variant="h3" style={{ padding: "2vmax" }}>
               Social Media App
            </Typography>

            <Avatar
               src={avatar}
               alt="User"
               sx={{ height: "10vmax", width: "10vmax" }}
            />

            <input
               type="file"
               accept="image/*"
               onChange={handleImageChange}
               required
            />

            <input
               type="text"
               className="registerInputs"
               placeholder="Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
            />

            <input
               type="email"
               className="registerInputs"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />

            <input
               type="password"
               className="registerInputs"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />

            <Link to="/" >
               <Typography>Already Signed up?</Typography>
            </Link>

            {loading ? <CircularProgress /> :
               <Button type="submit">Sign up</Button>
            }

         </form>
      </div>
   );
};

export default Register;
