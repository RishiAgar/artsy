import Axios from 'axios';

// const customSerializer = (params) => {
//     const paramsStringify = qs.stringify(params, {
//         arrayFormat   : 'brackets',
//         serializeDate : (date) => format(date, 'isoUtcDateTime'),
//     });
//     return paramsStringify;
// };

export const request = Axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_URL,
});
