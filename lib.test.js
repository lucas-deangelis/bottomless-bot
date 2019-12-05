"use strict";

const {
    diffDays,
    getAlbum,
    addAlbum,
    getEpisodeURL,
    rewatchProgress
} = require("./lib");
const { episodes, beginning, milliSecPerDay, titles } = require("./variables");
const { createUser, getUsersAndAlbums, clearUsers } = require("./queries");
const db = require("./db");

test("difference between two equal dates is O", async done => {
    const now = Date.now();
    expect(diffDays(now, now)).toBe(0);

    done();
});

test("difference between one date and one date + 1 day is 1", async done => {
    const now = Date.now();
    const tomorrow = now + 86400000;

    expect(diffDays(now, tomorrow)).toBe(1);

    done();
});

test("difference between one date and one date + 7 days is 7", async done => {
    const now = Date.now();
    const inOneWeek = now + 7 * 86400000;

    expect(diffDays(now, inOneWeek)).toBe(7);

    done();
});

test("getAlbum send all the albums", async done => {
    const people = [
        { name: "Coko", album: "toto", ready: true },
        { name: "Izuk", album: "titi", ready: true },
        { name: "Hiki", album: "tata", ready: true },
        { name: "Sokow", album: "tutu", ready: true }
    ];

    let album = [];

    for (let i = 0; i < people.length; ++i) {
        album.push(getAlbum(people));
    }

    expect(album.includes("toto")).toBe(true);
    expect(album.includes("titi")).toBe(true);
    expect(album.includes("tata")).toBe(true);
    expect(album.includes("tutu")).toBe(true);

    done();
});

test("submitAlbum works", async done => {
    await clearUsers();

    const album = "Toto - Africa";
    const author = "Hiki";

    const msg = {
        content: `&submitAlbum ${album}`,
        author: author
    };

    await addAlbum(msg);

    const res = await getUsersAndAlbums();

    const testedObject = res.filter(el => el.name === author)[0];

    expect(testedObject.name).toBe(author);
    expect(testedObject.albums[0].name).toBe("Toto - Africa");

    await clearUsers();
    await db.close();

    done();
});

test("getEpisodeURL works", done => {
    const episode = "AXZ E2";
    const unknownEpisode = "Zesshoushinai 1";

    const res = getEpisodeURL(episode);
    const res2 = getEpisodeURL(unknownEpisode);

    expect(res).toBe(
        "https://myanimelist.net/anime/32836/Senki_Zesshou_Symphogear_AXZ/episode/2"
    );

    expect(res2).toBe("");

    done();
});

/**
 * Copied getInputDate and episodeDate, and modified them slightly so they could work in the test environment
 */

const getInputDate = msg => {
    const inputDate = msg.replace("&episodeDate ", "");

    return inputDate;
};

const episodeDate = msg => {
    let theDate;
    let inputCmd = msg.replace("&episode", "");

    const inputDate = getInputDate(msg);

    if (inputCmd === "Today") {
        theDate = new Date();
        theDate.setHours(0, 0, 0);
    }
    if (inputCmd === "Tomorrow") {
        theDate = new Date();
        theDate.setDate(theDate.getDate() + 1);
        theDate.setHours(0, 0, 0);
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

/**
 * Set these next three tests to be skipped by default, as they rely on specific dates and episodes.
 */
xtest("episodeDate works", async done => {
    const msg = "&episodeDate 29/11/2019";

    const episodeTest = episodeDate(msg);

    console.log(episodeTest);
    expect.stringContaining("29/11/2019's episode is AXZ E13");

    done();
});

xtest("episodeToday works", async done => {
    const msg = "&episodeToday";
    const episodeTest = episodeDate(msg);

    console.log(episodeTest);
    expect.stringContaining("Today's episode is AXZ E13");

    done();
});

xtest("episodeTomorrow works", async done => {
    const msg = "&episodeTomorrow";
    const episodeTest = episodeDate(msg);

    console.log(episodeTest);
    expect.stringContaining("Tomorrow's episode is Zesshoushinai AXZ 1");

    done();
});

test("rewatchProgress works", async done => {
    const msg = "&rewatchProgress";

    const res = rewatchProgress(msg);

    expect.stringContaining("current rewatch progress:");

    done();
});
