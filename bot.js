require('dotenv').config();
const episodes = require('./episodes');
const { diffDays } = require('./diffDays');



const beginning = new Date('October 1, 2019 15:17:00');


const Discord = require('discord.js');
const client = new Discord.Client();

token = process.env.BOT_TOKEN;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.includes('whichepisode')) {
        let dateToday = Date.now();
        let nbEpisode = diffDays(beginning, dateToday);
        let episode = episodes[nbEpisode];
        msg.reply(episode);
    }
    if (msg.content.includes('whichtomorrow')) {
        let dateToday = Date.now();
        let nbEpisode = diffDays(beginning, dateToday);
        let episode = episodes[nbEpisode + 1];
        msg.reply(episode);
    }
});

client.login(token);