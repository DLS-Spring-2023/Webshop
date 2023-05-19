import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ORDER_URL } from "$env/static/private";

export const load: PageServerLoad = async ({cookies, fetch}) => {
    
    const order_id = cookies.get('order_id');
    if (!order_id) throw error(403, 'Forbidden');

    cookies.set('order_id', '', {
        expires: new Date(0),
        path: '/',
    });

    const fetchOrder = async () => {
        const response = await fetch(`${ORDER_URL}/orders/purchase-history`, {
            headers: {
                'Authorization': `Bearer ${cookies.get('access_token')}`,
            },
        });

        if (!response.ok) throw error(response.status, response.statusText);

        const data = await response.json();
        return data.find((order: any) => order._id === order_id);
    }

    return {
        order: fetchOrder(),
    }
};

