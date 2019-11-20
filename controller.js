const { episodeDate } = require("./lib");

function controller(msg) {
    if (msg.content.startsWith("&episode")) {
        const reply = episodeDate(msg);
        msg.reply(reply);
    }
    if (msg.content.startsWith("&addAlbum")) {
        msg.reply(` has been added to your queue.`);
    }
}

module.exports = {
    controller
};
