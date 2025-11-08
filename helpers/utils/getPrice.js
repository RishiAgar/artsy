export const CURRENCY = "$";

export const getDiscountedPrice = (price, discountPercentage) =>  price * (100 - discountPercentage) / 100;

const getPrice = price => (
    `${CURRENCY}${price.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    })}`
);

export default getPrice;
