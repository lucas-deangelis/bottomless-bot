"use strict";

const { episodes, beginning, milliSecPerDay } = require("./variables");

const {
    createUser,
    clearUsers,
    incrementUserAlbumCount,
    createAlbumForUser,
    markAlbumAsPassed,
    getUsersAndAlbums
} = require("./queries");


const db = require("./db");

const diffDays = (firstDate, secondDate) => {
    let diff = firstDate - secondDate;
    let days = diff / milliSecPerDay;
    let absDays = Math.abs(days);
    let roundDays = Math.round(absDays);
    return roundDays;
};

const converter = date => {
    const splitDate = date.split('/');
    return new Date(`${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`);
};

const episodeDate = (dateUS, dateFR, msg) => {

    let theDate = new Date(dateUS);
    theDate.setHours(0, 0, 0);

    const nbEpisode = (diffDays(beginning, theDate) % episodes.length);
    const episode = episodes[nbEpisode];

    if (msg === 'eTd') {
        return `Today's episode is ${episode}`;
    } else if (msg === 'eTmr') {
        return `Tomorrow's episode is ${episode}`;
    } else {
        return `the episode for ${dateFR} is ${episode}`;
    }
};

const getAlbum = people => {
    let readyPeople = [];

    for (let el of people) {
        if (el.ready) {
            readyPeople.push(el);
        }
    }

    const choice = Math.floor(Math.random() * readyPeople.length);
    readyPeople[choice].ready = false;
    return readyPeople[choice].album;
};

const submitAlbum = async(author, album) => {
    const users = await getUsersAndAlbums();
    const userDoesNotExist = users.every(el => el.username !== author);

    if (userDoesNotExist) {
        await createUser(author);
    }

    await createAlbumForUser(album, author);
};

const addAlbum = async msg => {
    const album = msg.content.replace("&submitAlbum ", "");
    const author = msg.author;

    await submitAlbum(author, album);
};

const getEpisodeURL = episode => {
    const season = episode.split(' E')[0];
    const ep = episode.split('E')[1];

    let url;

    const seasons = new Map();
    seasons.set('S1', '11751/Senki_Zesshou_Symphogear');
    seasons.set('G', '15793/Senki_Zesshou_Symphogear_G');
    seasons.set('GX', '21573/Senki_Zesshou_Symphogear_GX');
    seasons.set('AXZ', '32836/Senki_Zesshou_Symphogear_AXZ');
    seasons.set('XV', '32843/Senki_Zesshou_Symphogear_XV');

    if (seasons.has(season)) {
        seasons.forEach(seasonHash => {
            if (seasonHash === seasons.get(season)) {
                url = `https://myanimelist.net/anime/${seasonHash}/episode/${ep}`;
            }
        });
    } else {
        url = '';
    }

    return url;
}





module.exports = {
    diffDays,
    getAlbum,
    addAlbum,
    getEpisodeURL,
    episodeDate,
    converter
};