const getRelativeTimeFromNow = time => {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
        return "";
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffMinutes = diffMs / (1000 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffMinutes < 1) {
        return "today";
    }

    const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

    if (sameDay) {
        return "today";
    }

    if (diffDays < 7) {
        return "this week";
    }

    const months =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());

    if (months <= 0) {
        return "this month";
    }

    if (months === 1) {
        return "last month";
    }

    return `${months} months ago`;
}

export default getRelativeTimeFromNow;
