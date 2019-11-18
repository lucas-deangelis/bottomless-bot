const db = require("./db");
/**
 * Clears the database. Used for tests only
 */
async function clearUsers() {
    const text = "TRUNCATE TABLE users CASCADE";
    try {
        await db.query(text);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    clearUsers
}