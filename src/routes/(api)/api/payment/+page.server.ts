import { redirect, type Actions, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ORDER_URL } from "$env/static/private";
import { elastic } from "$lib/server/sdk/Elastic";
import Auth from "$lib/server/auth/Auth";

export const load: PageServerLoad = async ({ cookies, fetch }) => {

    // initial load. Copy order to payment cookie and redirect to here (actual load)
    // This is because the Stripe transaction prevents cookies from being sent
    const stripeOrder = cookies.get('stripe_order');
    if (stripeOrder) { 
        cookies.set('order', stripeOrder, {
            path: '/',
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
        });

        cookies.set('stripe_order', '', {
            expires: new Date(0),
            path: '/',
        });
        throw redirect(302, '/api/payment');
    }

    // actual load. Get payment cookie with cart items and return it
    const order = cookies.get('order');    
    if (!order) throw error(403, 'Forbidden');
    cookies.set('order', '', {
        expires: new Date(0),
        path: '/',
    });

    // items
    const items = order.split(',').map(o =>{
        return {
            id: o.split(':')[0],
            quantity: o.split(':')[1],
        }
    });
    
    const getCartItems = async () => {
        const response = await elastic.mget({
            index: 'products',
            body: {
                ids: items.map(i => i.id),
            }
        });
        
        const products = response.docs.map((doc) => {
            const quantity = items.find(i => i.id === doc._id)?.quantity || 0;

            return {
                // @ts-ignore
                name: doc._source.title,
                quantity,
                // @ts-ignore
                price: doc._source.price * quantity,
            }
        });

        return products;
    } 

    const products = await getCartItems();
    return {
        products,
    }
};

export const actions: Actions = {
    initial: async ({request, cookies}) => {
        const form = await request.formData();
        const cart = form.get('cart');

        if (!cart || typeof cart !== 'string') throw error(400, 'Bad request');

        cookies.set('stripe_order', cart, {
            path: '/',
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
        });
    },

    actual: async (event) => {
        const request = event.request;
        const cookies = event.cookies;
        
        const form = await request.formData();
        const data = form.get('data');

        if (!data || typeof data !== 'string') throw error(400, 'Bad request');

        const products = JSON.parse(data) as {name: string, quantity: number, price: number}[];

        const auth = new Auth(event);
        const user = await auth.getUser();

        const createOrder = async () => {
            const response = await fetch(ORDER_URL + '/orders/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.get('access_token')}`,
                },
                body: JSON.stringify({
                    customerEmail: user.email,
                    items: products,
                    totalPrice: products.reduce((acc, curr) => acc + curr.price, 0),
                }),
            });
    
            const data = await response.json();
            return data;
        }
    
        const orderData = await createOrder();
        
        cookies.set('order_id', orderData._id, {
            path: '/',
            sameSite: 'lax',
            secure: true,
            httpOnly: true,
        });
    }
};