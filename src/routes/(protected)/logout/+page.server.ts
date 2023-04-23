import { error, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Auth from '$lib/server/auth/Auth';

export const load = (async () => {
    throw error(404, 'Not found');
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const auth = new Auth(event);
        await auth.logoutUser();
        throw redirect(302, '/');
    }
};