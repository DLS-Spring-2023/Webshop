import type { Product } from '$lib/types/types';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch, params}) => {

    const fetchProduct = async () => {
        const res = await fetch(`https://dummyjson.com/products/${params.id}`);
        const product = await res.json();
        return product as Product;
    }

    return { product: fetchProduct() };
}) satisfies PageServerLoad;