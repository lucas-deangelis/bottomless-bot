const { episodes, beginning, milliSecPerDay } = require("./variables");

const {
    createUser,
    createAlbumForUser,
    getUsersAndAlbums
} = require("./queries");

const diffDays = (firstDate, secondDate) => {
    const diff = firstDate - secondDate;
    const days = diff / milliSecPerDay;
    const absDays = Math.abs(days);
    const roundDays = Math.round(absDays);
    return roundDays;
};

const getInputDate = msg => {
    const inputDate = msg.content.replace("&episodeDate ", "");

    return inputDate;
};

const getEpisodeURL = episode => {
    const season = episode.split(" E")[0];
    const ep = episode.split("E")[1];

    let url;

    const seasons = new Map();
    seasons.set("S1", "11751/Senki_Zesshou_Symphogear");
    seasons.set("G", "15793/Senki_Zesshou_Symphogear_G");
    seasons.set("GX", "21573/Senki_Zesshou_Symphogear_GX");
    seasons.set("AXZ", "32836/Senki_Zesshou_Symphogear_AXZ");
    seasons.set("XV", "32843/Senki_Zesshou_Symphogear_XV");

    if (seasons.has(season)) {
        seasons.forEach(seasonHash => {
            if (seasonHash === seasons.get(season)) {
                url = `https://myanimelist.net/anime/${seasonHash}/episode/${ep}`;
            }
        });
    } else {
        url = "";
    }

    return url;
};

const episodeDate = msg => {
    let theDate;
    let inputCmd = msg.content.replace("&episode", "");

    const inputDate = getInputDate(msg);

    if (inputCmd === "Today") {
        theDate = new Date();
    }
    if (inputCmd === "Tomorrow") {
        theDate = new Date();
        theDate.setDate(theDate.getDate() + 1);
    }
    if (inputCmd.includes("Date")) {
        const dayMonthYear = inputDate.split("/");

        theDate = new Date(
            `${dayMonthYear[2]}-${dayMonthYear[1]}-${dayMonthYear[0]}`
        );

        inputCmd = inputDate;
    }

    const nbEpisode = diffDays(beginning, theDate) % episodes.length;
    const episode = episodes[nbEpisode];
    const url = getEpisodeURL(episode);
    return `${inputCmd.toLowerCase()} episode is ${episode}:\n\n${url}`;
};

const getAlbum = people => {
    const readyPeople = people.filter(el => el.ready);

    const choice = Math.floor(Math.random() * readyPeople.length);
    readyPeople[choice].ready = false;
    return readyPeople[choice].album;
};

const submitAlbum = async (author, album) => {
    const users = await getUsersAndAlbums();
    const userDoesNotExist = users.every(el => el.username !== author);

    if (userDoesNotExist) {
        await createUser(author);
    }

    await createAlbumForUser(album, author);
};

const addAlbum = async msg => {
    const { author } = msg;
    const album = msg.content.replace("&submitAlbum ", "");

    await submitAlbum(author, album);
};

module.exports = {
    diffDays,
    getAlbum,
    addAlbum,
    getEpisodeURL,
    episodeDate
};
