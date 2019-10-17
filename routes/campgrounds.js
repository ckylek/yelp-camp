var express = require("express"),
	router = express.Router({mergeParams: true}),
	Campground = require("../models/campground"),
	middleware = require("../middleware")
//===============================
//Campground ROUTES
//===============================

//index route
router.get("/", function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log("Find Campgrounds Error");
			console.log(err);
		} else {
			res.render("campgrounds/index.ejs",{campgrounds:allCampgrounds, currentUser: req.user});
		}
	})
	
});

//Create - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	//res.send("You have reached the Post route");
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	//create a variable to store the new campground information
	var newCampground = {name: name, image: image, description: desc, author:author}
	//Create a new campground and save to database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

//NEW - create a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
//The "/:id" can be any text that comes after "campgrounds/" therefore this must go last
router.get("/:id", function(req, res){
	//find the campground with associated id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found/");
			res.redirect('back');
		} else {
			//render show template with that campgrounds
			res.render("campgrounds/show.ejs", {campground:foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit.ejs", {campground: foundCampground});
	});
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err);
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground deleted.")
			res.redirect("/campgrounds");
		}
	})
})



module.exports = router;