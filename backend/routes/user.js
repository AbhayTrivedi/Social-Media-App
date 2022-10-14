const { register, login, followUser, logout, updatePassword, updateProfile, deleteUser, myProfile, getUserProfile, getAllProfiles, forgetPassword, resetPassword, getMyPosts, getUserPosts } = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");
const express = require("express");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/user/delete").delete(isAuthenticated, deleteUser);

router.route("/profile/me").get(isAuthenticated, myProfile);

router.route("/me/posts").get(isAuthenticated, getMyPosts);

router.route("/user/posts/:id").get(isAuthenticated, getUserPosts);

router.route("/profiles").get(isAuthenticated, getAllProfiles);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
