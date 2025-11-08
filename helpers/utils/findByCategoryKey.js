import categories from '@/helpers/constants/categories.json';

const findByCategoryKey = key => {
    const filtered = categories.flatMap(section => section.items).filter(x => x.category === key);
    return filtered?.[0] || {};
}

export default findByCategoryKey;
