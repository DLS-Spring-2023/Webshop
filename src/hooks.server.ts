import Auth from '$lib/server/auth/Auth';
import type { Handle, RequestEvent } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
   
    event.locals.authenticated = await Auth.verifyUser(event);
    event.locals.theme = getTheme(event);

    return resolve(event, {
        transformPageChunk: ({ html }) => {
            if (event.locals.theme) return html.replace('<html lang="en">', `<html lang="en" class="${event.locals.theme}">`)
            else return html;
        }
    });
}) satisfies Handle;

const getTheme = (event: RequestEvent) => {
    const theme = event.cookies.get('theme');
    const newTheme = event.url.searchParams.get('theme');
    return theme || newTheme || undefined;
}