const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
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


const seedDB = async() => {
	//Remove all campgrounds
	await Campground.deleteMany({});
	await Comment.deleteMany({});
	console.log("removed campgrounds!");
	for (const seed of data) {
		const campground = await Campground.create(seed);
		console.log("added campground");
		//create a comment
		const comment = await Comment.create({
				text:"This place is great, but I wish there was 				internet",
				author: "Homer"
			});
		console.log("Create new comment");
		campground.comments.push(comment);
		campground.save();
	}
}

module.exports = seedDB;