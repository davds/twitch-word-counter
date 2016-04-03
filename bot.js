/*

	Twitch Word-Counting Bot made by David Stone.
	Language: Node.js
	Modules used: 
	- Twitch Messaging Interface (tmijs.org)
	- File System (http://nodejs.org/api/fs.html)

	I am not as experienced with Node.js so this code may seem very primative at times.

	This bot counts the number of times a word is found within a Twitch chat message.
	You can modify the words being checked by editing the 

*/

//Requiring needed modules.
var tmi = require('tmi.js');
var fs = require('fs');

var date = new Date();
var time = (date.getMonth()+1) + '-' + (date.getDate()) + '-' + (date.getFullYear()) + ' ' + (date.getHours()) + '-' + (date.getMinutes()) + '-' + (date.getSeconds());
fs.mkdir('./' + time);

//Array used to check for each word.
var words = ['example', 'words', 'go', 'here'];

//Set all the counts of each word equal to zero.
words.forEach(function(word) {
	fs.writeFile('./' + time + '/' + word + '.txt', '0');
});

//Array used to count each word.
var count = [];
words.forEach(function(word) {
	count.push(0); 
});

//The settings for the channel being monitored and the Twitch account being used to monitor it.
var settings = {
	identity: {
		username: 'example_username', //Username goes here.
		password: 'oauth:' //oauth code goes here.
	},
	connection: {
		cluster: 'aws',
		reconnect: true
	},
	options: {
		debug: true
	},
	channels: ['example_channel'] //Channel goes here.
};

//Creating the bot with the declared settings.
var client = new tmi.client(settings);

//Connecting to Twitch channel.
client.connect();

//When connecting successfully the bot will say 'Reporting for duty!'
client.on('connected', function(address, port) {
	client.say(settings.channels[0], 'Reporting for duty!');
});

//When a new chat message is sent in the channel the bot will run through this function.
client.on('chat', function(channels, user, message, self) {
	var arrayPlace = 0;
	words.forEach(function(word) {
		if (message.toLowerCase().indexOf(word) > -1) {
			//Add 1 to the count.
			count[arrayPlace]++;

			//Set the count file equal to this count.
			fs.writeFile('./' + time + '/' + word + '.txt', count[arrayPlace]);

    		//To show it was successful print "***UPDATED (the word found) COUNT***" in console.
			console.log("***UPDATED " + word + " COUNT***");
		}
		//To the next words counter.
		arrayPlace++;
	});
});


