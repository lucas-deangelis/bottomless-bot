const db = require("./db");

async function getUsersAndAlbums() {
    const text =
        "SELECT * FROM users as u FULL OUTER JOIN albums as a ON u.name = a.userName";

    try {
        const res = await db.query(text);
        const rows = res.rows;

        let users = [];
        let usersDone = [];
        for (let el of rows) {
            if (!usersDone.includes(el.username)) {
                users.push({ name: el.username, albums: [] });
                usersDone.push(el.username);
            }
        }

        for (let el of rows) {
            for (let user of users) {
                if (el.username == user.name) {
                    user.albums.push(el.name);
                }
            }
        }

        return users;
    } catch (err) {
        console.log(err);
    }
}

async function createUser(name) {
    const text =
        "INSERT INTO users (name, countAlbum) VALUES ($1, 0) RETURNING *";
    try {
        const res = await db.query(text, [name]);
        return res.rows;
    } catch (err) {
        console.log(err);
    }
}

async function clearUsers() {
    const text = "TRUNCATE TABLE users CASCADE";
    try {
        await db.query(text);
    } catch (err) {
        console.log(err);
    }
}

async function incrementUserAlbumCount(name) {
    const getUser = "SELECT countAlbum FROM users WHERE users.name = $1";
    const updateUser =
        "UPDATE users SET countAlbum = $2 WHERE users.name = $1 RETURNING countAlbum";

    try {
        const res = await db.query(getUser, [name]);

        const num = res.rows[0].countalbum;

        const newAlbumCount = num + 1;

        const res2 = await db.query(updateUser, [name, newAlbumCount]);

        return res2.rows;
    } catch (err) {
        console.log(err);
    }
}

async function createAlbumForUser(albumName, userName) {
    const createAlbum =
        "INSERT INTO albums (name, userName, passed) VALUES ($1, $2, false) RETURNING *";

    try {
        const res = await db.query(createAlbum, [albumName, userName]);

        return res.rows;
    } catch (err) {
        console.log(err);
    }
}

async function markAlbumAsPassed(albumName) {
    const updateAlbum =
        "UPDATE albums SET passed = true WHERE name = $1 RETURNING *";

    try {
        const res = await db.query(updateAlbum, [albumName]);

        return res.rows;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createUser,
    clearUsers,
    incrementUserAlbumCount,
    createAlbumForUser,
    markAlbumAsPassed,
    getUsersAndAlbums
};