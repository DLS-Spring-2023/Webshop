import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    const response = await resolve(event);

    if (!event.cookies.get('access_token') && event.route.id?.startsWith('/(protected)')) {
        const ref = event.url.pathname + event.url.search;
        if (ref) throw redirect(302, `/login?ref=${btoa(ref)}`);
    }

    return response;
}) satisfies Handle;