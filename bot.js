"use strict";

require("dotenv").config();
const { controller } = require("./controller");

const Discord = require("discord.js");
const client = new Discord.Client();

const token = process.env.BOT_TOKEN;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => controller(msg));

client.login(token);