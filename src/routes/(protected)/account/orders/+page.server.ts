import { ORDER_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch, cookies}) => {

    const fetchOrders = async () => {
        const response = await fetch(`${ORDER_URL}/orders/purchase-history`, {
            headers: {
                'Authorization': `Bearer ${cookies.get('access_token')}`,
            },
        });

        if (!response.ok) throw error(response.status, response.statusText);

        const data = await response.json();
        console.log(data);
        
        return data;
    }


    return {
        orders: fetchOrders(),
    };
}) satisfies PageServerLoad;