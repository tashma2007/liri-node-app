require("dotenv").config();

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

//var Spotify = require("node-spotify-api");

var moment = require("moment");

var axios = require("axios");

var fs = require("fs");

var inquirer = require('inquirer');


inquirer.prompt([
    {
type: "input",
name: "concert",
message: "What is the name of the artist or band that you would like to find an event for?"

    }

]).then(function(answers) {
    console.log(JSON.stringify(answers, null, ' '));

})