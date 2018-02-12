var twitterKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require ("fs");

// console.log(process.argv)

var userInput = process.argv[2]

//Twitter logic
if (userInput === "my-tweets") {
	// console.log("here")
	myTweets();

//Spotify logic	
} else if (userInput === "spotify-this-song") {
		var song = process.argv[3]
		spotifySongs(song);

//original plan was to use an if else statement for when a song isn't entered
//I couldn't figure out how to code an empty process.argv[3]		
	
//OMDB logic
} else if (userInput === 'movie-this') {
	var movieName = process.argv[3];
	movieRequest();

//Do-what-it-says logic
} else if (userInput === 'do-what-it-says'){
	doThisYo();
}

//Grabs tweets
function myTweets(){
	var client = new Twitter({
	  consumer_key: twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.access_token_secret
	});
	 
	var params = {
		screen_name: 'L11182321',
		count: 20
	};
		
	// the screen name changes the user
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for(var i = 0; i < tweets.length; i++){
	  		// console.log(tweets);
	  		console.log(tweets[i].text + "---" + tweets[i].user.created_at);
	  		}
	  	}
	})
};

// Grabs songs
function spotifySongs(song){
	var song = process.argv[3]
	var spotify = new Spotify({
	  id: '32b041150c3c493db64f240d5e56171c',
	  secret: '3df5178b173c461d8e720d0e6fa09ef7'
	});
	 
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  	} else {
	  		console.log("Song Name: " + data.tracks.items[0].name);
	  		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
	  		console.log("Album Title: " + data.tracks.items[0].album.name);	
	  		console.log("Preview Link: " + data.tracks.items[0].album.external_urls.spotify)
	  	}
	});
}

//Grabs the sign song
function theSign(){
	var spotify = new Spotify({
	  id: '32b041150c3c493db64f240d5e56171c',
	  secret: '3df5178b173c461d8e720d0e6fa09ef7'
	});
	 
	spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  	} else {
	  		// console.log(data);
	  		console.log("Song Name: " + data.tracks.items[0].name);
	  		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
	  		console.log("Album Title: " + data.tracks.items[0].album.name);	
	  		console.log("Preview Link: " + data.tracks.items[0].album.external_urls.spotify)
	  	}
	});
}

// //Get movie
function movieRequest(){
	console.log("this is the movie" + movieName)
	var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	request(queryURL, function (error, response, body) {
		if (!error && response.statusCode === 200) {
  			console.log("Movie Title: " + JSON.parse(body).Title);
  			console.log("Year: " + JSON.parse(body).Year);
  			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
  			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
  			console.log("Country: " + JSON.parse(body).Country);
  			console.log("Language: " + JSON.parse(body).Language);
  			console.log("Plot: " + JSON.parse(body).Plot);
  			console.log("Actors: " + JSON.parse(body).Actors);
  		}
	  	console.log('error:', error); // Print the error if one occurred
	  	console.log('statusCode:', -response && response.statusCode); // Print the response status code if a response was received
	  	console.log('body:', body); // Print the HTML for the Google homepage.
  	// console.log(queryURL);
  	
		})
	}	

//Do-dis
function doThisYo(){
	fs.readFile("random.txt", "utf8", function(error, data) {

  	// If the code experiences any errors it will log the error to the console.
	  if (error) {
	  return console.log(error);
	  }

	  // We will then print the contents of data
	  console.log(data);

	  // Then split it by commas (to make it more readable)
	  var dataArr = data.split(",");

	  // We will then re-display the content as an array for later use.
	  console.log(dataArr[1]);


	  //There has to be a better way than to re-write the spotifySongs function
		var spotify = new Spotify({
		  id: '32b041150c3c493db64f240d5e56171c',
		  secret: '3df5178b173c461d8e720d0e6fa09ef7'
		});
		 
		spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  	} else {
		  		console.log("Song Name: " + data.tracks.items[0].name);
		  		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
		  		console.log("Album Title: " + data.tracks.items[0].album.name);	
		  		console.log("Preview Link: " + data.tracks.items[0].album.external_urls.spotify)
		  	}
		});
	})
}	