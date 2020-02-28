const Discord = require('discord.js');
const {token , pics} = require('./config.json');
const request = require('request');
const cheerio = require('cheerio');
const bot = new Discord.Client();
var number;
const PREFIX = '#';
var weight = [];
var grade = [];
const fs = require('fs');
bot.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    bot.commands.set(command.name, command);
}
function eq(str1 , str2){
    var Result = false;
    if(str1.toUpperCase() === str2.toUpperCase()){
        Result = true;
    }
    return Result;
}
bot.on('ready', ()=>{
    bot.user.setPresence({
        game:{
            name: '#help',
            type: "WATCHING",
        }
    });
	console.log('Bot is online');
})
bot.on('message' , msg => {
    if (!msg.content.startsWith(PREFIX)) return;
	let args = msg.content.substring(PREFIX.length).split(" ");
	number = Math.floor((Math.random()*5)+1);
	if(eq(args[0],'R')){
		msg.channel.send({files: [pics[number-1]]});
	}
	else if(eq(args[0],'help')){
		msg.author.send('The commands in use for the Bot is: \n 1). #r, which rolls one of 5 server regulars \n 2) #dzmaps, which displays dayz maps with military areas marked \n 3) #image <keyword(s)>, sends a random image in the category of the keyword \n 4) #calc <weight1> <grade1> <weight2> <grade2> ... so on, enter grade weight then the grade for that weight in alternating order until you are done');
	}
	else if(eq(args[0],'dzmaps')){
		msg.channel.send("Chernarus", {files: ["https://i.imgur.com/KGldspA.jpg"]});
		msg.channel.send("Livonia", {files: ["https://i.imgur.com/3WnwNse.jpg"]});
	}
	else if(eq(args[0],'image')){
		image(msg , args);
    }
    else if(eq(args[0],'calc')){
        bot.commands.get('calc').execute(msg , args);
    }
    else if((eq(args[0] , 'puppy')&& msg.author.username === 'georgiashoaf')){
        puppy(msg);
    }
	else{
        if(msg.content.charAt(0) === '#'){
        msg.reply('The command you entered is invalid, use "#help" for a list of commands');
        }
	}
	
});
function image(message, parts) {
 
    var search = parts.slice(1).join(" "); 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            return;
        }
 
        message.channel.send(urls[0]);
	});
}
function puppy(message) {

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "puppy",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            return;
        }
 
        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
	});
}
bot.login(token);