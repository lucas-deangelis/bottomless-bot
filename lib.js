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

const submitAlbum = (author, album) => {
    const users = getUsersAndAlbums();
    const userDoesNotExist = users.every(el => el.username !== author);

    if (userDoesNotExist) {
        createUser(author);
    };

    createAlbumForUser(album, author);
};

const addAlbum = (msg) => {
    const album = msg.content.replace('&addAlbum ', '');
    const author = msg.author;

    submitAlbum(author, album);
};


module.exports = {
    diffDays,
    getAlbum,
    addAlbum,
    episodeDate,
    converter
};