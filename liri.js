// node pkgs and keys
require("dotenv").config();

var fs = require("fs");

var inquirer = require('inquirer');

var axios = require("axios");

var moment = require("moment");

var keys = require("./keys.js");

//var Spotify = require("node-spotify-api");

//var spotify = new Spotify(keys.spotify);



inquirer.prompt([
    {
        type: "list",
        name: "entertainment",
        message: "Hi! My name is Liri-Bot. Please choose from one of the following choices so that I may assist you:",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    },
]).then(function (inquirerResponse) {
    //console.log(inquirerResponse)

    switch (inquirerResponse) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
    }

    function concertThis() {
        inquirer.prompt([
            {
                type: "input",
                name: "concert-this",
                message: "What is the name of the artist or band that you would like to find an event for?"

            },
        ]).then(function (inquirerResponse) {
            axios.get("https://rest.bandsintown.com/artists/" + inquirerResponse.band + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    for (var i = 0; i < 5; i++) {
                        console.log(inquirerResponse)
                    }
                })
            })
        };








    //{
        //type: "input",
        //name: "concert",
        //message: "What is the name of the artist or band that you would like to find an event for?"

    //},

    //{
        //type: "input",
        //name: "song",
        //message: "What is the name of the song that you are searching for?"

    //},

    //{
        //type: "input",
        //name: "movie",
        //message: "What is the name of the movie that you are searching for?"


    //},

   //{
        //type: "input",
        //name: "concert",
        //message: "What is the name of the artist or band that you would like to find an event for?"

    //}

        

});