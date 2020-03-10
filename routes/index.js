const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//===============================
//Authentication ROUTES
//===============================

//Rooot Route
router.get("/", (req, res) => {
	res.render("landings.ejs");
});

//show register form
router.get("/register", (req,res) => {
	res.render("register.ejs", {page: 'register'});
});

//handle sign up logic
router.post("/register", (req, res) => {
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
    		console.log(err);
    		return res.render("register.ejs", {error: err.message});
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome to YelpCamp " + req.body.username);
			res.redirect("/campgrounds");
		});
	});
});


//show the login page
router.get("/login", (req, res) => {
	res.render("login.ejs", {page: 'login'});
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect:"/login"
	}), (req, res) => {
});

//logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("error", "You have logged out")
	res.redirect("/campgrounds")
});

// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login")
// }

module.exports = router;