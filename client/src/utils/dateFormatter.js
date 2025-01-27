const getDateInEnglish = (date) => {      
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();

    if (new Date().getDate() - day === 1) return "Yesterday";
    if (new Date().getDate() - day === 2) return "2 days ago";
    if (new Date().getDate() - day === 3) return "3 days ago";
    if (new Date().getDate() - day === 4) return "4 days ago";
    if (new Date().getDate() - day === 5) return "5 days ago";
    if (new Date().getDate() - day === 6) return "6 days ago";
    if (new Date().getDate() - day === 0) return "Today";
    if (new Date().getDate() - day >= 7) return "A week ago";
    if (new Date().getDate() - day >= 14) return "2 weeks ago";
    if (new Date().getDate() - day >= 21) return "3 weeks ago";
    if (new Date().getDate() - day >= 28) return "a month ago";

    const monthInEnglish = [
        "Jan",
        "Feb",
        "March",
        "April",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    const monthIndex = new Date(date).getMonth();

    const month = monthInEnglish[monthIndex];

    return `${day} ${month}, ${year}`;
};

export default getDateInEnglish;