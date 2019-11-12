require("dotenv").config();
const { episodes, beginning } = require("./variables");
const { diffDays } = require("./lib");

const Discord = require("discord.js");
const client = new Discord.Client();

token = process.env.BOT_TOKEN;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    if (msg.content.includes("whichepisode")) {
        let nbEpisode = diffDays(beginning, Date.now());
        let episode = episodes[nbEpisode];
        msg.reply(episode);
    }
    if (msg.content.includes("whichtomorrow")) {
        let nbEpisode = diffDays(beginning, Date.now());
        let episode = episodes[nbEpisode + 1];
        msg.reply(episode);
    }
});

client.login(token);