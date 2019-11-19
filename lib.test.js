"use strict";

const { diffDays, getAlbum, addAlbum, getEpisodeURL, rewatchProgress } = require("./lib");
const { episodes, beginning, milliSecPerDay } = require("./variables")

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
    const unknownEpisode = 'Zesshoushinai 1';

    const res = getEpisodeURL(episode);
    const res2 = getEpisodeURL(unknownEpisode)

    expect(res).toBe('https://myanimelist.net/anime/32836/Senki_Zesshou_Symphogear_AXZ/episode/2')

    expect(res2).toBe('');

    done();
});


const episodeDate = (dateUS, dateFR, msg) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    let dateTest = new Date(dateUS);
    dateTest.setHours(0, 0, 0);

    const nbEpisodeTest = (diffDays(beginning, dateTest) % episodes.length);
    const episodeTest = episodes[nbEpisodeTest];

    if (msg === 'eTd') {
        return `Today's episode is ${episodeTest}`;
    } else if (msg === 'eTmr') {
        return `Tomorrow's episode is ${episodeTest}`;
    } else {
        return `The episode for ${dateFR} is ${episodeTest}`;
    }
}

const converter = date => {
    const splitDate = date.split('/');
    return new Date(`${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`);
}

test('episodeDate works', async done => {
    const msg = 'eDate';
    const frDate = '19/11/2019';

    const episodeTest = episodeDate(converter(frDate), frDate, msg);

    expect(episodeTest).toBe(`The episode for 19/11/2019 is AXZ E3`);
    console.log(episodeTest);

    done();
});


test('episodeToday works', async done => {
    const msg = 'eTd';
    const episodeTest = episodeDate(Date.now(), Date.now(), msg);

    expect(episodeTest).toBe('Today\'s episode is AXZ E3');
    console.log(episodeTest);

    done();
});

test('episodeTomorrow works', async done => {
    const msg = 'eTmr'
    const episodeTest = episodeDate((Date.now() + milliSecPerDay), Date.now(), msg);


    expect(episodeTest).toBe('Tomorrow\'s episode is AXZ E4');
    console.log(episodeTest);

    done();
});

test('episodeDate works', async done => {
    const msg = 'eDate';
    const frDate = '31/12/2019';

    const episodeTest = episodeDate(converter(frDate), frDate, msg);

    expect(episodeTest).toBe('The episode for 31/12/2019 is S1 E9');
    console.log(episodeTest);
    done();
});

test('rewatchProgress works', async done => {
    const msg = '&rewatchProgress';

    const res = rewatchProgress(msg);

    expect(res).toBe('current rewatch progress: 60% *(EP 50/83)*.')

    done();
})