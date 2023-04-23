import Auth from '$lib/server/auth/Auth';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {

    event.locals.authenticated = await Auth.verifyUser(event);

    return resolve(event);
}) satisfies Handle;
