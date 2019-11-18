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

const episodeDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateParsed = Date.parse(date);

    const dateFormated = date.toLocaleDateString('en-US', options);

    const nbEpisode = (diffDays(beginning, dateParsed) % episodes.length);
    const episode = episodes[nbEpisode];
    msg.reply(`the episode for ${dateFormated} is ${episode}`);
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
    episodeDate
};