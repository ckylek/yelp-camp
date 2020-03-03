//all middleware will go in here
//define middleware as an object
const middlewareObj = {};
const Campground = require("../models/campground")
const Comment = require("../models/comment")

middlewareObj.asyncMiddleware = fn => 
	(req, res, next) => {
		Promise.resolve(fn(req, res, next))
		.catch(next)
	} 

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	if(req.isAuthenticated()){
		//if so does user own the campground
		Campground.findById(req.params.id, (err, foundCampground) => {
			if(err || !foundCampground){
				req.flash("error", "Campground not found.")
				res.redirect("back")
				console.log(err);
			} else {
				//does user own the cmapground?
			if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that")
					res.redirect("back");
				}	
			}
		})
	} else {
		req.flash("error", "You need to be logged in to access that.")
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
	if(req.isAuthenticated()){
		//if so does user own the comment
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if(err || !foundComment){
				req.flash("error", "Comment not found.");
				res.redirect("back")
			} else {
				//does user own the comment
			if(foundComment.author.id.equals(req.user._id)) {
					next()
				} else {
					req.flash("error", "You don't have permission to do that.")
					res.redirect("back")
				}	
			}
		})
	} else {
		req.flash("error", "You need to be logged in to access that.")
		res.redirect("back")
	}
}

//MIDDLEWARE
middlewareObj.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next()
	}
	req.flash("error", "You need to be logged in to do that.")
	res.redirect("/login")
}


module.exports = middlewareObj;