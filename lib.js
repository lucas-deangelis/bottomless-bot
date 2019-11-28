const { episodes, beginning, milliSecPerDay, seasons, titles } = require("./variables");

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
    const [season, ep] = episode.split(" E");

    let url;

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
    return `${inputCmd.toLowerCase()}'s episode is ${episode}:\n\n> **${titles[nbEpisode]}**\n\n${url}`;
};

const rewatchProgress = (msg) => {

    const theDate = new Date();
    const nbEpisode = (diffDays(beginning, theDate) % episodes.length);

    const progress = Math.round((nbEpisode / episodes.length) * 100);

    return `current rewatch progress: ${progress}% *(EP ${nbEpisode}/${episodes.length})*.`

};


const getAlbum = people => {
    const readyPeople = people.filter(el => el.ready);

    const choice = Math.floor(Math.random() * readyPeople.length);
    readyPeople[choice].ready = false;
    return readyPeople[choice].album;
};

const userExists = (usersAndAlbums, author) => {
    if (usersAndAlbums.length < 1) {
        return false;
    }
    return usersAndAlbums.reduce((el, acc) => acc || el.username === author);
};

const submitAlbum = async (author, album) => {
    const users = await getUsersAndAlbums();

    if (!userExists(users, author)) {
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
    episodeDate,
    rewatchProgress
};
