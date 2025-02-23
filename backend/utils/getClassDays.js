const getClassDays = (startDate, dayOfWeek) => {
    const classDays = [];
    const currentDate = new Date(startDate);

    // Find the first occurrence of the specified day of the week
    while (currentDate.getDay() !== dayOfWeek) {
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Add 4 class days (one for each week of the month)
    for (let i = 0; i < 4; i++) {
        classDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
    }

    return classDays;
};

module.exports = getClassDays;