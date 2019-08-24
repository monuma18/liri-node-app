# liri-node-app Charles Monuma 
LIRI Node App
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Commands to run LIRI
Follow the format presented in these queries

-node liri.js spotify-this-song ''

-node liri.js movie-this ''

-node liri.js do-what-it-says

Introduction
I created a node.js app called LIRI. LIRI is like SIRI (from an iphone).

It must be ran in the command line.

LIRI is a Language Interpretation and Recognition Interface.

LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will do any of the below command when you enter them into the command line.


spotify-this-song
movie-this
do-what-it-says


node liri.js spotify-this-song ''

* shows the following information about the song in the terminal
	1. artist(s)
	2. song name
	3. preview link of the song from spotify
	4. album that the song is a part of

* Example for movie
node liri.js movie-this ''

* this would output the following information to the terminal:
	1. Title
	2. Year
	3. IMDB Rating
	4. Country
	5. Language
	6. Plot
	7. Actors
	8. Rotten Tomatoes Rating
	9. Rotten Tomatoes URL


* Example for do what it says
node liri.js do-what-it-says



* These are the npm packages I used and are needed to run the app
	 fs package in node
	1. [spotify](https://www.npmjs.com/package/spotify)
	2. [request](https://www.npmjs.com/package/request)
	3. [node-spotify-api] (https://www.npmjs.com/package/node-spotify-api) 




Spotify: https://developer.spotify.com/my-applications/

OMDb API: http://www.omdbapi.com/apikey.aspx
