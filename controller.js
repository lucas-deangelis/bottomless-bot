"use strict";

const { milliSecPerDay } = require("./variables");
const { episodeDate, rewatchProgress, addAlbum } = require("./lib");

function controller(msg) {
    if (msg.content.startsWith("&episode")) {
        const reply = episodeDate(msg);
        msg.reply(reply);
    }
    if (msg.content.startsWith("&rewatchProgress")) {
        const reply = rewatchProgress(msg);
        msg.reply(reply);
    }
    if (msg.content.startsWith("&addAlbum")) {
        await addAlbum(msg);
        msg.reply(`${album} has been added to your queue.`);
    }
}

module.exports = {
    controller
};
