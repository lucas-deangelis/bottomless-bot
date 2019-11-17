"use strict";

const { milliSecPerDay } = require("./variables");

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
    users = getUsersAndAlbums();
    const userExists = users.some(el => el.username === author);

    if (userExists === false) {
        createUser(author);
        createAlbumForUser(album, author);
    } else {
        createAlbumForUser(album, author);
    }
}

module.exports = {
    diffDays,
    getAlbum,
    submitAlbum
};