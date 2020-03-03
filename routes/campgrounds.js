const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const { asyncMiddleware, isLoggedIn, checkCampgroundOwnership } = require("../middleware")
//===============================
//Campground ROUTES
//===============================

//index route
router.get("/", asyncMiddleware(async (req, res, next) => {
	//Get all campgrounds from DB
	let allCampgrounds = await Campground.find({})
	res.render("campgrounds/index.ejs",{campgrounds:allCampgrounds, currentUser: req.user});
}))

//Create - add new campground to DB
router.post("/", isLoggedIn, asyncMiddleware(async (req, res) => {
	//res.send("You have reached the Post route");
	//get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	//create a variable to store the new campground information
	let newCampground = {name: name, image: image, description: desc, author:author}
	//Create a new campground and save to database
	let newlyCreated = await Campground.create(newCampground)
		console.log(newlyCreated);
		sres.redirect("/campgrounds");
}))

//NEW - create a new campground
router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new.ejs");
})

//SHOW - shows more info about one campground
//The "/:id" can be any text that comes after "campgrounds/" therefore this must go last
router.get("/:id", asyncMiddleware(async (req, res) => {
	//find the campground with associated id
	let foundCampground = await 	Campground.findById(req.params.id).populate("comments").exec()
	//render show template with that campgrounds
	res.render("campgrounds/show.ejs", 	{campground:foundCampground})
}))

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", checkCampgroundOwnership, asyncMiddleware(async (req, res) => {
	let foundCampground = await Campground.findById(req.params.id)
	res.render("campgrounds/edit.ejs", {campground: foundCampground})
}))

//UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundOwnership, asyncMiddleware(async (req, res) => {
	await Campground.findByIdAndUpdate(req.params.id, req.body.campground)
	res.redirect(`/campgrounds/${req.params.id}`);
}))

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", checkCampgroundOwnership, asyncMiddleware(async (req, res) => {
	await Campground.findByIdAndRemove(req.params.id)
		req.flash("success", "Campground deleted.")
		res.redirect("/campgrounds")
}))

module.exports = router;