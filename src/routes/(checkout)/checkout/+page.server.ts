import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({parent}) => {
    await parent();
    throw redirect(302, '/checkout/shipping');
};