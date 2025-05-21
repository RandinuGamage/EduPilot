const getClassDays = (startDate, dayOfWeek) => {
    const classDays = [];
    const currentDate = new Date(startDate);
    let endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1); // Add 1 year

    // Find the first occurrence of the specified day of the week
    while (currentDate.getDay() !== dayOfWeek) {
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Iterate through the dates until the end date is reached
    while (currentDate <= endDate) {
        classDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 7);// Move to the next week
    }
    return classDays;
};

module.exports = getClassDays;