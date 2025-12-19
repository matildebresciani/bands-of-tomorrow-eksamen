export const trimTrailingSlash = (url: string) => {
    return url.replace(/\/+$/, '');
};
