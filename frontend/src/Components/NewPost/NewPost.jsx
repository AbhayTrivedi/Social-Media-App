import { Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { creatNewPost } from '../../Actions/Post';
import { loadUser } from '../../Actions/User';
import "./NewPost.css";

const NewPost = () => {
   const [image, setImage] = useState(null);
   const [caption, setCaption] = useState("");

   const { loading, error, message } = useSelector(state => state.like);

   const dispatch = useDispatch();
   const alert = useAlert();

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      const Reader = new FileReader();

      Reader.readAsDataURL(file);

      Reader.onload = () => {
         if (Reader.readyState === 2) {
            setImage(Reader.result);
         }
      };
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      await dispatch(creatNewPost(caption, image));
      dispatch(loadUser());
      setImage(null);
      setCaption("");
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
   }, [alert, error, message, dispatch]);

   return (
      <div className='newPost'>
         <form className='newPostForm' onSubmit={submitHandler}>
            <Typography variant='h3'>New Post</Typography>

            {image && <img src={image} alt='Post' />}

            <input type="file" accpet="image/*" onChange={handleImageChange} />
            <input
               type="text"
               placeholder='Caption...'
               value={caption}
               onChange={(e) => setCaption(e.target.value)} />

            {loading ? <CircularProgress /> :
               <Button type="submit">Post</Button>
            }
         </form>
      </div>
   );
};

export default NewPost;