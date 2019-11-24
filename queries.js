const db = require("./db");

function userIndex(users, userName) {
    let index = 0;

    for (let user of users) {
        if (user.name === userName) {
            return index;
        }
        ++index;
    }

    return -1;
}

/**
 * @return {array} an array of objects which represents users. These objects have a name property, which is the user name, and an albums property, which is an array of albums names.
 */
async function getUsersAndAlbums() {
    const text =
        'SELECT users.name as "username", albums.name as "albumname", users.countAlbum as "countAlbum", albums.passed FROM users FULL OUTER JOIN albums ON users.id = albums.userId';

    try {
        const res = await db.query(text);

        let usersAndAlbums = [];

        for (let row of res.rows) {
            const indexUser = userIndex(usersAndAlbums, row.username);
            if (indexUser != -1) {
                usersAndAlbums[indexUser].albums.push({
                    name: row.albumname,
                    passed: row.passed
                });
            } else {
                usersAndAlbums.push({
                    name: row.username,
                    count: row.countAlbum,
                    albums: [{ name: row.albumname, passed: row.passed }]
                });
            }
        }

        return usersAndAlbums;
    } catch (err) {
        console.error(err);
    }
}
/**
 *
 * @param {string} name - The name of the user to be created
 */
async function createUser(name) {
    const text =
        "INSERT INTO users (name, countAlbum) VALUES ($1, 0) RETURNING *";
    try {
        const res = await db.query(text, [name]);
        return res.rows;
    } catch (err) {
        console.error(err);
    }
}
/**
 * Clears the database. Used for tests only
 */
async function clearUsers() {
    const text = "TRUNCATE TABLE users CASCADE";
    try {
        await db.query(text);

        return 0;
    } catch (err) {
        console.error(err);
    }
}

/**
 *
 * @param {string} name - The name of the user which will have his album number count incremented
 */
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
        console.error(err);
    }
}

/**
 * Creates an album and associate it with an user
 * @param {string} albumName
 * @param {string} userName
 */
async function createAlbumForUser(albumName, userName) {
    const getUserId = "SELECT id FROM users WHERE name = $1";
    const createAlbum =
        "INSERT INTO albums (name, userId, passed) VALUES ($1, $2, false) RETURNING *";

    try {
        const res1 = await db.query(getUserId, [userName]);
        const userId = res1.rows[0].id;
        const res = await db.query(createAlbum, [albumName, userId]);

        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

/**
 *
 * @param {string} albumName
 */
async function markAlbumAsPassed(albumName) {
    const updateAlbum =
        "UPDATE albums SET passed = true WHERE name = $1 RETURNING *";

    try {
        const res = await db.query(updateAlbum, [albumName]);

        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

async function addAlbumToHistory(albumName, date) {
    const idAlbum = "SELECT id FROM albums WHERE albums.name = $1";
    const insertAlbum =
        "INSERT INTO semaines (albumid, date) VALUES ($1, $2) RETURNING *";

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    try {
        const queryIdAlbum = await db.query(idAlbum, [albumName]);

        const id = queryIdAlbum.rows[0].id;

        const query = await db.query(insertAlbum, [id, formattedDate]);

        return query.rows;
    } catch (err) {
        console.error(err);
    }
}

async function getHistory() {
    const history =
        "SELECT albums.name, semaines.date FROM semaines INNER JOIN albums on semaines.albumid = albums.id";

    try {
        const query = await db.query(history);

        return query.rows;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    createUser,
    clearUsers,
    incrementUserAlbumCount,
    createAlbumForUser,
    markAlbumAsPassed,
    getUsersAndAlbums,
    addAlbumToHistory,
    getHistory
};
