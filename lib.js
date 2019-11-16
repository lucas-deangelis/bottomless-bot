const { milliSecPerDay } = require("./variables");

const diffDays = (firstDate, secondDate) => {
    let diff = firstDate - secondDate;
    let days = diff / milliSecPerDay;
    let absDays = Math.abs(days);
    let roundDays = Math.round(absDays);
    return roundDays;
};

const getAlbum = people => {
    let readyPeople = [];
    
    for (let el of people) {
        if (el.ready) {
            readyPeople.push(el);
        }
    }
    choice = Math.floor(Math.random() * readyPeople.length);
    readyPeople[choice].ready = false;
    return readyPeople[choice].album;
};

module.exports = {
    diffDays,
    getAlbum
};