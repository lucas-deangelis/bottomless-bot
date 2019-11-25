DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS semaines CASCADE;

ALTER SEQUENCE users_id_seq RESTART;
ALTER SEQUENCE albums_id_seq RESTART;
ALTER SEQUENCE semaines_id_seq RESTART;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name varchar(50) UNIQUE NOT NULL,
    countAlbum integer NOT NULL
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    name varchar(256) NOT NULL,
    artist varchar(256),
    link varchar(256),
    passed boolean NOT NULL,
    userId integer references users(id)
);

CREATE TABLE semaines (
    id SERIAL PRIMARY KEY,
    albumId integer references albums(id),
    date varchar(50)
);