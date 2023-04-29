import { setError, superValidate } from 'sveltekit-superforms/client';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import Auth from '$lib/server/auth/Auth';

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    address: z.string().min(1),
    phone: z.string().min(1),
});

export const load = (async (event) => {

    const fetchAccount = async () => {
        const auth = new Auth(event);
        const user = await auth.getUser();
        
        return {
            name: user.name,
            email: user.email,
            address: "555 Main St.",
            phone: "555-555-5555",
        }
    }

    const form = superValidate(await fetchAccount(), schema, {
        id: 'editForm',
    });
    
    //   const registerForm = await superValidate(registerSchema, {
    //     id: 'registerForm'
    //   });
    
    return { 
        form 
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    edit: async (event) => {
        const form = await superValidate(event.request, schema, {
            id: 'editForm'
        });
        
        if (!form.valid) {
            return fail(400, { editForm: form });
        }

        const { name, email } = form.data;

        const auth = new Auth(event);
        const result = await auth.updateUser({ name, email });

        if (result.error) {
            if (result.error.code === 409) {
                return setError(form, 'email', 'Email already in use');
            }
            
            form.message = result.error.message.toString();
            return fail(result.error.code, { editForm: form });
        }

        return {
            status: 200,
            form,
        }
    }
};