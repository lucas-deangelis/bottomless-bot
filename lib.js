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

const getEpisodeURL = episode => {
    const season = episode.split(' E')[0];
    const ep = episode.split('E')[1];

    let url;
    switch (season) {
        case 'S1':
            {
                url = `https://myanimelist.net/anime/11751/Senki_Zesshou_Symphogear/episode/${ep}`;
                break;
            }
        case 'G':
            {
                url = `https://myanimelist.net/anime/15793/Senki_Zesshou_Symphogear_G/episode/${ep}`;
                break;
            }
        case 'GX':
            {
                url = `https://myanimelist.net/anime/21573/Senki_Zesshou_Symphogear_GX/episode/${ep}`;
                break;
            }
        case 'AXZ':
            {
                url = `https://myanimelist.net/anime/32836/Senki_Zesshou_Symphogear_AXZ/episode/${ep}`;
                break;
            }
        case 'XV':
            {
                url = `https://myanimelist.net/anime/32843/Senki_Zesshou_Symphogear_XV/episode/${ep}`;
                break;
            }
    }

    return url;
}





module.exports = {
    diffDays,
    getAlbum,
    addAlbum,
    getEpisodeURL
};