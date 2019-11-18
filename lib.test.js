"use strict";

const { diffDays, getAlbum, addAlbum } = require("./lib");
const { episodes, beginning, milliSecPerDay } = require("./variables")

/*
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


test('submitAlbum works', async done => {

    const msg = {
        content: '&submitAlbum Toto - Africa',
        author: 'Hiki'
    };

    addAlbum(msg);

    const res = await getUsersAndAlbums();

    expect(res[0].name).toBe('Hiki');
    expect(res[0].albums).toContain('Toto - Africa');

    done();
});*/

const episodeDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateTest = new Date(date);
    //const dateParsed = Date.parse(dateTest);
    const nbEpisodeTest = (diffDays(beginning, dateTest) % episodes.length);
    const episodeTest = episodes[nbEpisodeTest];
    console.log(`The episode for ${dateTest.toLocaleDateString('en-US', options)} is ${episodeTest}`);
    return episodeTest;
}


test('episodeDate works', async done => {
    const episodeTest = episodeDate("November 18, 2019");

    expect(episodeTest).toBe('AXZ E2');

    done();
});

test('episodeToday works', async done => {
    //const dateTest = new Date("2019-11-18");
    const episodeTest = episodeDate(Date.now());

    expect(episodeTest).toBe('AXZ E2');

    done();
});

test('episodeDate works', async done => {
    const episodeTest = episodeDate("2019-12-31");

    expect(episodeTest).toBe('S1 E9');

    done();
});