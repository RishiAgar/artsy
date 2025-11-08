const isProductInStock = (status, min, available) => {
    const minimum = Math.max(1, Number(min) || 1);
    const remaining = Math.max(0, Number(available) || 0);

    if (remaining < minimum) {
        return false;
    }

    return status === 'In Stock' || remaining >= minimum;
}

export default isProductInStock;
