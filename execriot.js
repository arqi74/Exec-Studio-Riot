const Discord = require('discord.js');
const fs = require('fs');
const app = new Discord.Client();

app.commands = [];
app.prefix = "riot ";
app.serwerID = "535835088471064577";
app.channelIDLog = "503316999582121995";


fs.readdir("./commands/", (err, files)=>{
    if(err) return console.error(err);
	files.forEach(file=>{
        if(!file.endsWith(".js")) return;
		let props = require('./commands/'+file);
		let commandName = file.split(".")[0];
		app.commands[commandName] =  props;
	});
});

fs.readdir("./events/", (err, files)=>{
    if(err) return console.error(err);
	files.forEach(file=>{
        if(!file.endsWith(".js")) return;
		let props = require('./events/'+file);
		let eventName = file.split(".")[0];
        app.on(eventName, props.bind(null, app));
    });
});

app.on("ready", () => {
	console.log("Ready: "+app.user.id); 
	ingame();
	function ingame() {
		var items = ["Prefix: riot", "Created by arwi74", "Discord Developers Product"];
		app.user.setActivity(items[Math.floor(Math.random()*items.length)]);
		setTimeout(ingame, 10000);
	}
});

app.login(require('./token.json').token);