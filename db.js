"use strict";

require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
    host: process.env.DBHOST
});

module.exports = {
    query: async(text, params, callback) => {
        return await pool.query(text, params, callback);
    },
    close: async() => {
        await pool.end();
    }
};