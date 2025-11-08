const maskEmail = email => {
    if (!email || typeof email !== "string") {
        return '';
    }

    const [local, domain] = email.split("@");

    if (local === null || local === undefined || local === '' || !domain) {
        return ;
    }

    return `${local[0]}*****@${domain[0]}*****`;
}

export default maskEmail;
