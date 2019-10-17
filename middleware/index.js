//all middleware will go in here
//define middleware as an object
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		//if so does user own the campground
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err || !foundCampground){
				req.flash("error", "Campground not found.")
				res.redirect("back")
				console.log(err);
			} else {
				//does user own the cmapground?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "Only the campground creator may edit this campground.")
					res.redirect("back");
				}	
			}
		});
	} else {
		req.flash("error", "You need to be logged in to access that.")
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		//if so does user own the comment
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error", "Comment not found.");
				res.redirect("back")
			} else {
				//does user own the comment
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "Only the comment creator may edit this comment.")
					res.redirect("back");
				}	
			}
		});
	} else {
		req.flash("error", "You need to be logged in to access that.")
		res.redirect("back");
	}
};

//MIDDLEWARE
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login first.")
	res.redirect("/login")
}


module.exports = middlewareObj;