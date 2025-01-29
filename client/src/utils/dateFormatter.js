const getDateInEnglish = (date) => {
    // Validate input date
    if (!date || isNaN(new Date(date))) {
        return "Invalid date";
    }

    const inputDate = new Date(date);
    const currentDate = new Date();

    // Calculate the difference in days
    const diffInTime = currentDate - inputDate;
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    // Handle relative dates
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays >= 28) return "a month ago";
    if (diffInDays >= 21) return "3 weeks ago";
    if (diffInDays >= 14) return "2 weeks ago";
    if (diffInDays >= 7) return "A week ago";
    if (diffInDays >= 2 && diffInDays <= 6) return `${diffInDays} days ago`;

    // Handle absolute dates
    const monthInEnglish = [
        "Jan", "Feb", "March", "April", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const day = inputDate.getDate();
    const monthIndex = inputDate.getMonth();
    const year = inputDate.getFullYear();

    return `${day} ${monthInEnglish[monthIndex]}, ${year}`;
};

export default getDateInEnglish;