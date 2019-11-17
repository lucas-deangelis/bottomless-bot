const { diffDays, getAlbum } = require("./lib");
const {
    createUser,
    clearUsers,
    incrementUserAlbumCount,
    createAlbumForUser,
    markAlbumAsPassed
} = require("./queries");

beforeEach(async() => {
    await clearUsers();
});

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

test("createUser creates a user", async done => {
    const res = await createUser("toto");
    expect(res.name).toBe("toto");
    expect(res.countalbum).toBe(0);

    done();
});

test("incrementUserAlbumCount works", async done => {
    const res = await createUser("toto");

    const res2 = await incrementUserAlbumCount("toto");

    expect(res2).toBeDefined;
    expect(res2[0].countalbum).toBe(1);

    done();
});

test("createAlbumForUser works", async done => {
    const resUser = await createUser("toto");
    const res = await createAlbumForUser("albumToto", "toto");

    expect(res[0].name).toBe("albumToto");
    expect(res[0].username).toBe("toto");

    done();
});

test("markAlbumAsPassed works", async done => {
    await createUser("toto");
    await createAlbumForUser("albumToto", "toto");
    const res = await markAlbumAsPassed("albumToto");

    expect(res[0].passed).toBe(true);

    done();
});