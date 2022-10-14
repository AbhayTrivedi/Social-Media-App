import { Avatar, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { followAndUnfollowUser, getUserPosts, getUserProfile } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import User from '../User/User';

const UserProfile = () => {
   const dispatch = useDispatch();
   const alert = useAlert();
   const params = useParams();

   const { user: me } = useSelector(state => state.user);
   const { user, loading: userLoading, error: userError } = useSelector(state => state.userProfile);
   const { loading, posts, error } = useSelector(state => state.userPosts);
   const { message, error: followError, loading: followLoading } = useSelector((state) => state.like);

   const [followersToggle, setFollowersToggle] = useState(false);
   const [followingToggle, setFollowingToggle] = useState(false);
   const [following, setFollowing] = useState(false);
   const [notMyProfile, setNotMyProfile] = useState(true);

   const followHandler = async () => {
      setFollowing(!following);
      await dispatch(followAndUnfollowUser(user._id));
      dispatch(getUserProfile(params.id));
   };

   useEffect(() => {
      dispatch(getUserPosts(params.id));
      dispatch(getUserProfile(params.id));
   }, [dispatch, params.id]);

   useEffect(() => {
      if (me._id === params.id) {
         setNotMyProfile(false);
      }
      if (user) {
         user.followers.forEach(item => {
            if (item._id === me._id) {
               setFollowing(true);
            } else {
               setFollowing(false);
            }
         });
      }
   }, [user, me._id, params.id]);

   useEffect(() => {
      if (error) {
         alert.error(error);
         dispatch({ type: "clearError" });
      }
      if (followError) {
         alert.error(followError);
         dispatch({ type: "clearError" });
      }
      if (userError) {
         alert.error(userError);
         dispatch({ type: "clearError" });
      }
      if (message) {
         alert.success(message);
         dispatch({ type: "clearMessage" });
      }
   }, [dispatch, alert, error, followError, userError, message]);

   return (
      loading || userLoading ? <Loader /> : (
         <div className='account'>
            <div className="accountLeft">
               {posts && posts.length > 0 ? (
                  posts.map((post) => (
                     <Post
                        key={post._id}
                        postId={post._id}
                        caption={post.caption}
                        postImage={post.image.url}
                        likes={post.likes}
                        comments={post.comments}
                        ownerImage={post.owner.avatar.url}
                        ownerName={post.owner.name}
                        ownerId={post.owner._id}
                        isAccount={"user"}
                     />
                  ))
               ) : (
                  <Typography variant="h6">User don't have any post yet</Typography>
               )}
            </div>

            <div className="accountRight">
               {user && (
                  <>
                     <Avatar src={user.avatar.url} sx={{ height: "8vmax", width: "8vmax" }} />

                     <Typography variant="h5">{user.name}</Typography>

                     <div>
                        <button onClick={() => setFollowersToggle(!followersToggle)}>
                           <Typography>Followers</Typography>
                        </button>
                        <Typography>{user.followers.length}</Typography>
                     </div>

                     <div>
                        <button onClick={() => setFollowingToggle(!followingToggle)}>
                           <Typography>Following</Typography>
                        </button>
                        <Typography>{user.following.length}</Typography>
                     </div>

                     <div>
                        <Typography>Posts</Typography>
                        <Typography>{user.posts.length}</Typography>
                     </div>

                     {notMyProfile && <Button
                        variant="contained"
                        disabled={followLoading}
                        style={{ background: following ? "red" : "blue" }}
                        onClick={followHandler} >{
                           following ? "Unfollow" : "Follow"
                        }</Button>}
                  </>
               )}

               <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                  <div className="DialogBox">
                     <Typography variant="h4">Followers</Typography>
                     {user && user.followers.length > 0 ? user.followers.map((follower) => (
                        <User
                           key={follower._id}
                           userId={follower._id}
                           name={follower.name}
                           avatar={follower.avatar.url}
                        />
                     )) : <Typography style={{ margin: "2vmax" }}>You have no followers</Typography>}
                  </div>
               </Dialog>

               <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                  <div className="DialogBox">
                     <Typography variant="h4">Following</Typography>
                     {user && user.following.length > 0 ? user.following.map((follows) => (
                        <User
                           key={follows._id}
                           userId={follows._id}
                           name={follows.name}
                           avatar={follows.avatar.url}
                        />
                     )) : <Typography style={{ margin: "2vmax" }}>You are not following anyone</Typography>}
                  </div>
               </Dialog>

            </div>
         </div>
      )
   );
};

export default UserProfile;
