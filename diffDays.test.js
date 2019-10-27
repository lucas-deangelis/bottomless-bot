const { diffDays } = require('./diffDays');

test('difference between now and now is O', () => {
    const now = Date.now();
    expect(diffDays(now, now)).toBe(0);
});

test('difference between now and now + 1 day is 1', () => {
    const now = Date.now();
    const tomorrow = now + 86400000;

    expect(diffDays(now, tomorrow)).toBe(1);
})

test('differene between now and now + 7 days is 7', () => {
    const now = Date.now();
    const inOneWeek = now + (7 * 86400000);

    expect(diffDays(now, inOneWeek)).toBe(7);
})