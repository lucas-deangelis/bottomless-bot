const {
    createUser,
    clearUsers,
    incrementUserAlbumCount,
    createAlbumForUser,
    markAlbumAsPassed,
    getUsersAndAlbums,
    addAlbumToHistory,
    getHistory
} = require("./queries");

const db = require("./db");

beforeEach(async () => {
    await clearUsers();
});

afterAll(async () => {
    await db.close();
});

test("createUser creates a user", async done => {
    const res = await createUser("toto");
    expect(res[0].name).toBe("toto");
    expect(res[0].countalbum).toBe(0);

    done();
});

test("incrementUserAlbumCount works", async done => {
    await createUser("toto");

    const res = await incrementUserAlbumCount("toto");

    expect(res).toBeDefined;
    expect(res[0].countalbum).toBe(1);

    done();
});

test("createAlbumForUser works", async done => {
    await createUser("toto");
    const res = await createAlbumForUser("albumToto", "toto");

    expect(res[0].name).toBe("albumToto");

    done();
});

test("markAlbumAsPassed works", async done => {
    await createUser("toto");
    await createAlbumForUser("albumToto", "toto");
    const res = await markAlbumAsPassed("albumToto");

    expect(res[0].passed).toBe(true);

    done();
});

test("getUsersAndAlbums works", async done => {
    await createUser("toto");
    await createAlbumForUser("albumToto1", "toto");
    await createAlbumForUser("albumToto2", "toto");

    await createUser("tata");
    await createAlbumForUser("albumTata1", "tata");
    await createAlbumForUser("albumTata2", "tata");

    await incrementUserAlbumCount("tata");

    const res = await getUsersAndAlbums();

    expect(res[0].name).toBe("toto");

    const albumsNameToto = [res[0].albums[0].name, res[0].albums[1].name];
    expect(albumsNameToto).toContain("albumToto2");
    expect(albumsNameToto).toContain("albumToto1");

    expect(res[0].count).toBe(0);

    expect(res[1].name).toBe("tata");

    const albumsNameTata = [res[1].albums[0].name, res[1].albums[1].name];
    expect(albumsNameTata).toContain("albumTata2");
    expect(albumsNameTata).toContain("albumTata1");

    expect(res[1].count).toBe(1);

    done();
});

test("history works", async done => {
    const date = new Date();

    await createUser("toto");
    await createAlbumForUser("albumToto", "toto");
    await addAlbumToHistory("albumToto", date);

    const res = await getHistory();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    expect(res[0].date).toBe(formattedDate);

    done();
});
