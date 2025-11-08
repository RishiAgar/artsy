
const getPlural = (count, noun, suffix = '') => {
    if (count <= 1) {
        return `${count || 0} ${noun}`;
    }

    return `${count} ${noun}${suffix}`;
};

export default getPlural;
