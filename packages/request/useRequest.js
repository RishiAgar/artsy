import { makeUseAxios } from 'axios-hooks';

import { request } from './setup';

export const useRequest = makeUseAxios({
    axios: request,
    cache: false,
    defaultOptions: { ssr: true },
});
