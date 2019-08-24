require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");


search(command)
function search(command) {
  switch (command) {
    case "concert-this":
      showConcert()
      break;
    case "spotify-this-song":
      showSpotify()
      break;
    case "movie-this":
      showMovie()
      break;
    case "do-what-it-says":
      showDoWhatItSays()
      break;
  }
}
function showDoWhatItSays() {
  console.log("read")
  fs.readFile("random.txt", "utf8", function (error, data) {
    var dataArr = data.split(",");
    console.log(dataArr)
    searchTerm=dataArr[1]; 
    search(dataArr[0])

  })

}

function showMovie() {
  axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {

      console.log("Title:", response.data.Title)
      console.log("Year:", response.data.Year)
      console.log("Imdb Rating:", response.data.imdbRating)
      console.log("Rotten Tomatoes Rating:", response.data.Ratings[1].Value)
      console.log("Country:", response.data.Country)
      console.log("Language:", response.data.Language)
      console.log("Plot:", response.data.Plot)
      console.log("Actors:", response.data.Actors)
    })
}

function showConcert() {
  axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log(response.data)
      for (var i = 0; i < response.data.length; i++) {
        console.log("Venue: ", response.data[i].venue.name)
        console.log("Venue location: ", response.data[i].venue.country, response.data[i].venue.city, response.data[i].venue.latitude, response.data[i].venue.longitude)
        console.log("Venue Date:", moment(response.data[i].datetime).format("MM/DD/YYYY"))
      }
      // var fileContent =JSON.stringify(response, null, 2);

      // fs.writeFile("./concert.txt", fileContent, (err) => {
      //     if (err) {
      //         console.error(err);
      //         return;
      //     };
      //     console.log("File has been created");
      // });

    })

}
function showSpotify() {
  spotify.search({ type: 'track', query: searchTerm, limit: 5 }, function (err, response) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    //  console.log(response.tracks.items)

    for (var i = 0; i < response.tracks.items.length; i++) {
      console.log("Artist Name: ", response.tracks.items[i].album.artists[0].name)
      console.log("Song Name:", searchTerm)
      console.log("Link:", response.tracks.items[i].album.external_urls)
      console.log("Album", response.tracks.items[i].name)
      console.log("-------------------------------------")

    }


    var fileContent = JSON.stringify(response, null, 2);

    fs.writeFile("./spotify.txt", fileContent, (err) => {
      if (err) {
        console.error(err);
        return;
      };
      console.log("File has been created");
    });


  });
}

// Import the API keys
var keys = require("./keys");
// Import the request npm package.
var request = require("request");
// Import the FS package for read/write.
var fs = require("fs");


// Function for running a Twitter Search

var callTwitterAPI = function () {
  var client = new Twitter(keys.twitter);
  var params = {
    screen_name: "bootcampstuden1"
  };
  client.get("statuses/user_timeline", params, function (
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};
// =====================================
// Function for running a Spotify Search
// _____________________________________
// Function for running a Spotify search
var callSpotifyAPI = function (songName) {
  if (songName === undefined) {
    songName = "1999";
  }
  spotify.search(
    {
      type: "track",
      query: songName,
      limit: 15
    },
    function (err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("Artist name: " + songs[i].artists[0].name);
        console.log("Song title: " + songs[i].name);
        console.log("Track number: " + songs[i].track_number);
        console.log("Album: " + songs[i].album.name);
        console.log("Release date: " + songs[i].album.release_date);
        console.log("Album type: " + songs[i].album.album_type);
        console.log("Preview song: " + songs[i].preview_url);
        console.log("----------------------------------------------------");
      }
    }
  );
};
// =====================================
// Function for running a OMDB Search
// _____________________________________
var callOMDBAPI = function (movieName) {
  if (movieName === undefined) {
    movieName = "snakes on a plane";
  }
  var urlHit =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";
  request(urlHit, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);
      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
    }
  });
};
// =====================================
// Function for determining which command is executed
// _____________________________________
var userCommand = function (caseData, functionData) {
  switch (caseData) {
    // use twitter api
    case "my-tweets":
      callTwitterAPI();
      break;
    // use spotify api
    case "spotify-this-song":
      callSpotifyAPI(functionData);
      break;
    // use omdb api
    case "movie-this":
      callOMDBAPI(functionData);
      break;

    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI can't understand your nonsense!");
  }
};
// =====================================
// Function to take data from .txt file and send to another function when user enters "do-what-it-says"
// _____________________________________
var doWhatItSays = function () {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    console.log(data);
    var dataArr = data.split(',');
    if (dataArr.length === 2) {
      userCommand(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      userCommand(dataArr[0]);
    }
  });
};
// =====================================
// Function which takes in command line arguments and executes switch statement accordigly
// _____________________________________
var cmdLnArgs = function (argOne, argTwo) {
  userCommand(argOne, argTwo);
};
// =====================================
// this takes in user input and assigns them as arguments
// _____________________________________
// cmdLnArgs(process.argv[2], process.argv[3]);



