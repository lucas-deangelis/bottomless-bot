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


module.exports = {
    diffDays,
    getAlbum,
    addAlbum
};