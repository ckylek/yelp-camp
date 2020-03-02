const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	flash = require("connect-flash"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seed");
require('dotenv').config();

//Routes for other files
const commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");



const url = process.env.DATABASEURL || 'mongodb://localhost/yelp_camp';
mongoose.connect(url, {
	useNewUrlParser: true, 
}).then(() => {
	console.log('Connected to DB');
}).catch(err => {
	console.log('Error', err.message);
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();//This will create teh default campgrounds and comments from seed.js

//Passport Configuration
app.use(require("express-session")({
	secret: "yelpcampy22",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

//Dry up code by including the common initial route (ex. "/campgrounds") that all routes in that path use
//Note when you do this, you need to add {mergeParams: true} to the express.Router in each route where you 
//include the initial route
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);



const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("The YelpCamp Server Has Started!");
});