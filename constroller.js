const { episodes, beginning } = require("./variables");
const { diffDays } = require("./lib");

function controller(msg) {
    if (msg.content.includes("&episodeToday")) {
        let nbEpisode = diffDays(beginning, Date.now());
        let episode = episodes[nbEpisode];
        msg.reply(episode);
    }
    if (msg.content.includes("&episodeTomorrow")) {
        let nbEpisode = diffDays(beginning, Date.now());
        let episode = episodes[nbEpisode + 1];
        msg.reply(episode);
    }
    if (msg.content.includes("&listCommands")) {
        msg.reply(
            `\nCommands must be prefixed with "&"\nepisodeToday -> today's episode\nepisodeTomorrow -> tomorrow 's episode\nlistCommands -> list of commands`
        );
    }
}

module.exports = {
    controller
};