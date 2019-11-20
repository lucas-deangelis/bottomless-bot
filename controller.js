"use strict";

const { helpMessage } = require("./variables");
const { episodeDate, converter, submitAlbum } = require("./lib");

function controller(msg) {
    const command = msg.content.trim();

    if (command.startsWith("&episode")) {
        const reply = episodeDate(command.replace('&episode', '').trim());
        (reply ? msg.reply(reply) : msg.reply(helpMessage));
    }
    if (command.startsWith("&addAlbum")) {
        addAlbum(msg);
        msg.reply(`${album} has been added to your queue.`);
    }
}

module.exports = {
    controller
};
