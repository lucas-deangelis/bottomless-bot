"use strict";

const { milliSecPerDay } = require("./variables");
const { episodeDate, converter, submitAlbum } = require("./lib");

function controller(msg) {
    if (msg.content.startsWith("&episodeToday")) {
        const inputCommand = 'eTd';
        const getEp = episodeDate(Date.now(), Date.now(), inputCommand);

        msg.reply(getEp);
    }
    if (msg.content.startsWith("&episodeTomorrow")) {
        const inputCommand = 'eTmr';
        const getEp = episodeDate((Date.now() + milliSecPerDay), Date.now(), inputCommand);

        msg.reply(getEp);
    }
    if (msg.content.startsWith("&episodeDate")) {
        const inputCommand = 'eDate';
        const inputDate = msg.content.replace('&episodeDate ', '');
        const getEp = episodeDate(converter(inputDate), inputDate, inputCommand);

        msg.reply(getEp);
    }
    if (msg.content.startsWith("&listCommands")) {
        msg.reply(
            `\nCommands must be prefixed with "&"\nepisodeToday -> today's episode\nepisodeTomorrow -> tomorrow 's episode\nepisodeDate -> specified date's episode (format : dd/mm/yyyy)\nlistCommands -> list of commands`
        );
    }
    if (msg.content.startsWith("&addAlbum")) {
        addAlbum(msg);
        msg.reply(`${album} has been added to your queue.`);
    }
}

module.exports = {
    controller
};