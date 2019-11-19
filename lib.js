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

const episodeDate = (msg) => {

    let theDate;
    let inputCmd = msg.content.replace('&episode', '');

    const getInputDate = (msg) => {
        const inputDate = msg.content.replace('&episodeDate ', '');

        return inputDate;
    }
    const inputDate = getInputDate(msg);


    if (inputCmd === 'Today') {
        theDate = new Date();
    }
    if (inputCmd === 'Tomorrow') {
        theDate = new Date();
        theDate.setDate(theDate.getDate() + 1);
    }
    if (inputCmd.includes('Date')) {

        const dayMonthYear = inputDate.split('/');

        theDate = new Date(`${dayMonthYear[2]}-${dayMonthYear[1]}-${dayMonthYear[0]}`);

        inputCmd = inputDate;
    }

    const nbEpisode = (diffDays(beginning, theDate) % episodes.length);
    const episode = episodes[nbEpisode];
    const url = getEpisodeURL(episode);
    return `${inputCmd.toLowerCase()} episode is ${episode}:\n\n${url}`;
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
};