module.exports = {
    diffDays: function(firstDate, secondDate) {
        let diff = firstDate - secondDate;
        let days = diff / 86400000;
        let absDays = Math.abs(days);
        let roundDays = Math.round(absDays);
        return roundDays;
    }
}