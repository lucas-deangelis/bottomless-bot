DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS albums;

CREATE TABLE users (
    name varchar(50) PRIMARY KEY,
    countAlbum integer NOT NULL
);

CREATE TABLE albums (
    name varchar(256) NOT NULL,
    artist varchar(256),
    link varchar(256),
    passed boolean NOT NULL,
    userName varchar(50) references users(name)
);