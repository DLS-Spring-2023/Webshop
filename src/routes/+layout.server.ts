import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals}) => {
    return {
        authenticated: locals.authenticated,
        user_id: locals.user_id,
        theme: locals.theme,
    }
    
};