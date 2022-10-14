import React from 'react';
import "./CommentCard.css";
import { Link, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentOnPost } from '../../Actions/Post';
import { getFollowingPosts, getMyPosts, getUserPosts } from '../../Actions/User';

const CommentCard = ({
   userId,
   name,
   avatar,
   comment,
   commentId,
   postId,
   isAccount
}) => {
   const { user } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const params = useParams();

   const deleteCommentHandler = async () => {
      await dispatch(deleteCommentOnPost(postId, commentId));

      if (isAccount === "owner") {
         dispatch(getMyPosts());
      } else if (isAccount === "user") {
         dispatch(getUserPosts(params.id));
      } else {
         dispatch(getFollowingPosts());
      }
   };

   return (
      <div className="commentUser">
         <Link to={`/user/${userId}`}>
            <img src={avatar} alt={name} />
            <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
         </Link>

         <Typography>
            {comment}
         </Typography>

         {isAccount === "owner" || (userId === user._id) ? (
            <Button onClick={deleteCommentHandler}>
               <Delete />
            </Button>
         ) : null}

      </div>
   );
};

export default CommentCard;
