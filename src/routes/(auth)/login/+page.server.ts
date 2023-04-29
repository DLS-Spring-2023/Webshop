import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import Auth from '$lib/server/auth/Auth';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    ref: z.string().optional(),
});

const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    repassword: z.string(),
    ref: z.string().optional(),
}).superRefine(({password, repassword }, ctx) => {
    if (password !== repassword) {
        ctx.addIssue({
            code: 'custom',
            path: ['repassword'],
            message: 'Does not match password',
        })
    }
});

export const load = (async (event) => {
    const loginForm = superValidate(loginSchema, {
        id: 'loginForm'
      });
    
      const registerForm = superValidate(registerSchema, {
        id: 'registerForm'
      });
    
      return { loginForm, registerForm };
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async (event) => {
        const { request } = event;
        const form = await superValidate(request, loginSchema, {
            id: 'loginForm'
        });

        if (!form.valid) return fail(400, { loginForm: form });

        const auth = new Auth(event);
        const { email, password } = form.data;
        const response = await auth.loginUser(email, password);

        if (response.error) {
            form.message = response.error.message;
            return fail(response.error.code, { loginForm: form });
        }
        
        if (form.data.ref) {
            const ref = Buffer.from(form.data.ref, 'base64').toString();
            throw redirect(302, `/${ref.slice(1)}`);
        }
        
        throw redirect(302, '/');
    },

    register: async (event) => {
        const { request } = event;
        const form = await superValidate(request, registerSchema, {
            id: 'registerForm'
        });
       
        if (!form.valid) return fail(400, { registerForm: form });

        const auth = new Auth(event);
        const { name, email, password } = form.data;
        const response = await auth.registerUser(name, email, password);
        
        if (response.error) {
            if (response.error.code === 409) form.errors.email = [response.error.message];
            else form.message = response.error;
            return fail(response.error.code, { registerForm: form });
        }

        if (form.data.ref) {
            const ref = Buffer.from(form.data.ref, 'base64').toString();
            throw redirect(302, `/${ref.slice(1)}`);
        }
        throw redirect(302, '/');
    }
};