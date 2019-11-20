const {
    createUser,
    clearUsers,
    incrementUserAlbumCount,
    createAlbumForUser,
    markAlbumAsPassed,
    getUsersAndAlbums
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
    expect(res[0].albums).toContain("albumToto2");
    expect(res[0].albums).toContain("albumToto1");
    expect(res[0].count).toBe(0);

    expect(res[1].name).toBe("tata");
    expect(res[1].albums).toContain("albumTata2");
    expect(res[1].albums).toContain("albumTata1");
    expect(res[1].count).toBe(1);

    done();
});
