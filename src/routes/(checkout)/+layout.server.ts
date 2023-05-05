import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ({locals}) => {
    if (!locals.authenticated) {
        const ref = Buffer.from('/checkout').toString('base64');
        const message = Buffer.from('You must be logged in to continue to checkout')
            .toString('base64');  

        throw redirect(302, '/login?ref=' + ref + '&msg=' + message);
    }
};