require('dotenv').config();


// Dirty implementation but I have to go fast
const beginning = new Date('October 1, 2019 15:17:00');
const oneDay = 24 * 60 * 60 * 1000;
function diffDays(firstDate, secondDate) {
    let diff = firstDate.getTime() - secondDate;
    let days = diff/oneDay;
    let absDays = Math.abs(days);
    let roundDays = Math.round(absDays);
    return roundDays;
}

/*
Total is 83 :
13 * 5 = 65 episodes
4 concerts
4 * 3 + 2 = 14 zesshoushinai
 */

var episodes = [
    "S1 E1", "S1 E2", "S1 E3", "S1 E4", "S1 E5", "S1 E6", "S1 E7", "S1 E8", "S1 E9", "S1 E10", "S1 E11", "S1 E12", "S1 E13",
    "Zesshoushinai 1",
    "G E1", "G E2", "G E3", "G E4", "G E5", "G E6", "G E7", "G E8", "G E9", "G E10", "G E11", "G E12", "G E13",
    "Zesshoushinai 2", "Concert G",
    "GX E1", "GX E2", "GX E3", "GX E4", "GX E5", "GX E6", "GX E7", "GX E8", "GX E9", "GX E10", "GX E11", "GX E12", "GX E13",
    "Zesshoushinai GX 1", "Zesshoushinai GX 2", "Zesshoushinai GX 3", "Zesshoushinai GX 4", "Concert GX",
    "AXZ E1", "AXZ E2", "AXZ E3", "AXZ E4", "AXZ E5", "AXZ E6", "AXZ E7", "AXZ E8", "AXZ E9", "AXZ E10", "AXZ E11", "AXZ E12", "AXZ E13",
    "Zesshoushinai AXZ 1", "Zesshoushinai AXZ 2", "Zesshoushinai AXZ 3", "Zesshoushinai AXZ 4", "Concert AXZ",
    "XV E1", "XV E2", "XV E3", "XV E4", "XV E5", "XV E6", "XV E7", "XV E8", "XV E9", "XV E10", "XV E11", "XV E12", "XV E13",
    "Zesshoushinai XV 1", "Zesshoushinai XV 2", "Zesshoushinai XV 3", "Zesshoushinai XV 4", "Concert XV"
]

/*
if (message.includes('!whichepisode')) {
    let today = new Date();
    let dateToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let episode = episodes[diffDays(beginning, dateToday)];
*/

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
        let episode = episodes[nbEpisode+1];
        msg.reply(episode);
    }
});

client.login(token);