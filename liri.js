// required dependencies
require("dotenv").config();

var fs = require("fs");

var inquirer = require('inquirer');

var axios = require("axios");

var moment = require("moment");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

//var spotify = new Spotify(keys.spotify);



inquirer.prompt([
    {
        type: "list",
        name: "commands",
        message: "Hi! My name is Liri-Bot! Please choose from one of the following choices, so that I may assist you:",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    },
])

.then(function (inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.computer == "concert-this") {

      inquirer
        .prompt([{
          type: "input",
          message: "Who do you want to see?",
          name: "artist",
        }, ]).then(function (inquirerResponse) {

       
          var queryURL = "https://rest.bandsintown.com/artists/" + inquirerResponse.artist + "/events?app_id=codingbootcamp";
          axios.get(queryURL)
            .then(function (response) {
              console.log("\n The concerts available are:\n");
              for (var i = 0; i < response.data.length; i++) {
                console.log(
                  "The venue is " + response.data[i].venue.name +
                  " in " + response.data[i].venue.city + " , " + response.data[i].venue.region + " on " +
                   moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a')
                )
              }
            });
          
        });

    }
    else if (inquirerResponse.computer == "spotify-this-song") {

      inquirer
        .prompt([{
          type: "input",
          message: "What song would you like to find?",
          name: "song",
        }, ]).then(function (inquirerResponse) {

          var spotify = new Spotify(keys.spotify);

          if(inquirerResponse.song === ""){

            console.log ("Artist: Janet Jackson")
                console.log ("Song Title: Any Time Any Place")
              console.log ("Spotify: https://open.spotify.com/track/2yOm4lN7aTygtXanJFNFWU?si=TzaJmacJRQaZg9h72pGDxw")
              console.log ("Album: Janet")
              console.log("----------------------------------------------------")
            
          }else {     
            
            spotify.search({ type: 'track', query: inquirerResponse.song }, function(err, data) {
              if (err) {
                return console.log('Error occurred: ' + err);
              }
             
            
            for (var i= 0; i < 5; i++) {
                console.log ("Artist: " + data.tracks.items[i].artists[0].name)
                console.log ("Song Title: " + data.tracks.items[i].name)
              console.log ("Spotify: " + data.tracks.items[i].preview_url)
              console.log ("Album: " + data.tracks.items[i].album.name)
              console.log("----------------------------------------------------")
              
              }
            })

          }
         
        });



    }
    else if (inquirerResponse.computer == "movie-this") {

      inquirer
        .prompt([{
          type: "input",
          message: "What movie do you want to watch?",
          name: "movie",
        }, ]).then(function (inquirerResponse) {
          if(inquirerResponse.movie === ""){

            console.log("Mr. Nobody came out in the year 2009, with an IMBD rating of 7.8 & a rating from Rotten Tomatoes of 67%. It was produced in the Belgium, Germany, Canada, France, USA, UK in English, Mohawk. The invigarating Plot is: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible. Starring Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham.")
            
          }else { 

       
          axios.get("http://www.omdbapi.com/?t=" + inquirerResponse.movie  + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
              // console.log(response)
              console.log(response.data.Title + " came out in the year " + response.data.Year + ", with an IMBD rating of " + response.data.imdbRating +
                " & a rating from " + response.data.Ratings[1].Source + " of " + response.data.Ratings[1].Value + "." + " It was produced in the " + response.data.Country +
                " in " + response.data.Language + "." + " The invigarating Plot is: " + response.data.Plot + " Starring " + response.data.Actors + "."
              );
            }
          );
          }
        });



    }
    else if (inquirerResponse.computer == "do-what-it-says") {

      fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        if(dataArr[0] === "spotify-this-song"){
          var spotify = new Spotify(keys.spotify);
          
          
          spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          
          for (var i= 0; i < 5; i++) {
            console.log ("Artist: " + data.tracks.items[i].artists[0].name)
            console.log ("Song Title: " + data.tracks.items[i].name)
          console.log ("Spotify: " + data.tracks.items[i].preview_url)
          console.log ("Album: " + data.tracks.items[i].album.name)
          console.log("----------------------------------------------------")
          }
          })

        }
        
        else if (dataArr[0] === "movie-this"){
          axios.get("http://www.omdbapi.com/?t=" + dataArr[1] + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
              // console.log(response)
              console.log(response.data.Title + " came out in the year " + response.data.Year + ", with an IMBD rating of " + response.data.imdbRating +
                " & a rating from " + response.data.Ratings[1].Source + " of " + response.data.Ratings[1].Value + "." + " It was produced in the " + response.data.Country +
                " in " + response.data.Language + "." + " The invigarating Plot is: " + response.data.Plot + " Starring " + response.data.Actors + "."
              );
            }
          );
        }
        
        else if (dataArr[0] === "concert-this"){
         
          var queryURL = "https://rest.bandsintown.com/artists/" + dataArr[1] + "/events?app_id=codingbootcamp";
          axios.get(queryURL)
            .then(function (response) {
              console.log("\n The concerts available are:\n");
              for (var i = 0; i < response.data.length; i++) {
                console.log(
                  "The venue is " + response.data[i].venue.name +
                  " in " + response.data[i].venue.city + " , " + response.data[i].venue.region + " on " +
                   moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a')
                )
              }
            });
        }
        
       
      
      });
      



    }  else {
      console.log("\nIt doesn't matter " + inquirerResponse.username + ", I have access anyway.\n");
    }
  });
