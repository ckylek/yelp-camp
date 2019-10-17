var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data = [
	{
		name: "Big Bend National Park", 
		image: "https://www.nps.gov/bibe/planyourvisit/images/IMG_5417.JPG",
		description: "Situated in the far hinterlands of East Texas, Big Bend is one of the most remote parks in the United States.  Renown for it's pristine primitiave camping and immense scenic views of the night sky.  During some parts of the year this is one best places in the U.S. to view the Milky Way Bulge in the night sky"
	},
	{	name: "Enchanted Rock", 
	 	image: "https://tpwd.texas.gov/state-parks/enchanted-rock/gallery/erock_7008.jpg",
	 	description:"A one-of-a-kind park situated around a large granite upwelling resembling a dome. The hike to the top of Enchanted Rock is a must-do but the hike up can be strenuous. A local favorite of Austinites, the park features many campground locations with grills and tables"
	},
	{	name: "Garner State Park", 
	 	image: "https://tpwd.texas.gov/state-parks/garner/gallery/GARNER-SP_HDR_3941.jpg",
		description: "One of the most popular parks in Texas for camping.  The park borders the Frio River providing an excellent swimming and recreational activity.  The park also contains many hike paths and trails where vistors can explore caves and check out the beautiful scenery."
	}
]


function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed selected campgrounds.");
		}
		// data.forEach(function(seed){
		// 	//Create Campground
		// Campground.create(seed, function(err, data){
		// 	if(err){
		// 		console.log(err);
		// 	} else {
		// 		console.log("added campground");
		// 		//create a comment
		// 		Comment.create(
		// 			{
		// 				text:"This place is great, but I wish there was internet",
		// 				author: "Homer"
		// 			}, function(err, comment){
		// 				if(err){
		// 					console.log(err);
		// 				} else {
		// 					data.comments.push(comment);
		// 					data.save();
		// 					console.log("Create new comment");
		// 				}
		// 			}
		// 		)
		// 	}
		// })
	})	
}

module.exports = seedDB;