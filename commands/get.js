exports.run = (client, message, args) => {
    const request = require('request');
    const Discord = require('discord.js');
    var champions = require('../data/champion.json');
    var options = {
        method: 'GET',
        url: 'https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+args[0], 
        qs: { 
            api_key: "RGAPI-4f9b7c73-5305-47da-b533-64a93558db69"
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        var data = JSON.parse(response.body);
        var options2 = {
            method: 'GET',
            url: 'https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'+data.id,
            qs: {
                api_key: "RGAPI-4f9b7c73-5305-47da-b533-64a93558db69"
            }
        }
        request(options2, function (error, response2) {
            if(error) throw new Error(error);
            var data2 = JSON.parse(response2.body);
            var result = [];
            var result2 = [];
            var result3 = [];
            var searchVal = data2[0].championId;
            var searchVal2 = data2[1].championId;
            var searchVal3 = data2[2].championId;
            for(i=0; i<champions.length; i++) {
                if(champions[i]["id"] == searchVal) {
                    result.push(champions[i]);
                }
            }
            for(i=0; i<champions.length; i++) {
                if(champions[i]["id"] == searchVal2) {
                    result2.push(champions[i]);
                }
            }
            for(i=0; i<champions.length; i++) {
                if(champions[i]["id"] == searchVal3) {
                    result3.push(champions[i]);
                }
            }
            var embed = new Discord.RichEmbed()
                .setAuthor("Command Executed", "https://www.maurizioliguori.com/images/logo/lol_icon.png", "")
                .setFooter("Request send by "+message.author.username)
                .setColor(0x12e91d)
                .setDescription("\n<:man_with_gua_pi_mao:548885234293145615> **Nick:** "+data.name+"\n<:trophy:548885234293145615> **Level:** "+data.summonerLevel+"\n<:wrench:548885234293145615> **AccoundID:** "+data.accountId)
                .setThumbnail("http://avatar.leagueoflegends.com/eune/"+args[0]+".png")
                .addField("<:first_place:548892472626118676> #1 "+result[0]["name"]+"", "**Level:** "+data2[0].championLevel+"\n**Points:** "+data2[0].championPoints)
                .addField("<:second_place:548892472626118676> #2 "+result2[0]["name"]+"", "**Level:** "+data2[1].championLevel+"\n**Points:** "+data2[1].championPoints)
                .addField("<:third_place:548892472626118676> #3 "+result3[0]["name"]+"", "**Level:** "+data2[2].championLevel+"\n**Points:** "+data2[2].championPoints)
            message.channel.send(embed);

        });
    });
}