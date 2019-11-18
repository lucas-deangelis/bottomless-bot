"use strict";

const { diffDays, getAlbum, addAlbum, getEpisodeURL } = require("./lib");


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
});

test('getEpisodeURL works', done => {

    const episode = 'AXZ E2';

    const res = getEpisodeURL(episode);

    expect(res).toBe('https://myanimelist.net/anime/32836/Senki_Zesshou_Symphogear_AXZ/episode/2');

    done();
});