require("dotenv").config();

const Discord = require("discord.js");
const { controller } = require("./controller");

const client = new Discord.Client();

const token = process.env.BOT_TOKEN;

let toto;
let tata;

client.on("message", msg => controller(msg));

client.login(token);