import { Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";
import './Search.css';

const Search = () => {
   const [name, setName] = useState("");

   const dispatch = useDispatch();

   const { users, loading } = useSelector((state) => state.allUsers);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(getAllUsers(name));
   };

   return (
      <div className="search">
         <form className="searchForm" onSubmit={submitHandler}>

            <Typography variant="h3" style={{ padding: "2vmax" }}>
               Social Media App
            </Typography>

            <input
               type="text"
               placeholder="Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
            />

            {loading ? <CircularProgress /> :
               <Button type="submit">Search</Button>
            }

            <div className="searchResults">
               {users && users.map(user => (
                  <User
                     key={user._id}
                     userId={user._id}
                     name={user.name}
                     avatar={user.avatar.url}
                  />
               ))}
            </div>

         </form>

      </div>
   );
};

export default Search;