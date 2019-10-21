var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

//===============================
//Authentication ROUTES
//===============================

//Rooot Route
router.get("/", function(req, res){
	res.render("landings.ejs");
});

//show register form
router.get("/register", function(req,res){
	res.render("register.ejs");
});
//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error",(err.message));
			return res.render("register.ejs");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});


//show the login page
router.get("/login", function(req, res){
	res.render("login.ejs");
});

router.post("/login", function(req, res) {
	if(err) {
		req.flash("error",("Babes, are you sure you put in the right password" + err.message));
		failureRedirect:"/login"
	}
	passport.authenticate("local", function(req, res){
		req.flash("success", "You have successfully signed in");
		successRedirect: "/campgrounds",
		
	}), 
	
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("error", "You have logged out")
	res.redirect("/campgrounds")
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
}

module.exports = router;