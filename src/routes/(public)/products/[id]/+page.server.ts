import { elastic } from '$lib/server/sdk/Elastic';
import type { Product } from '$lib/types/types';
import type { PageServerLoad } from './$types';
import { redis } from '$lib/server/sdk/Redis';

export const load = (async ({params, setHeaders}) => {

    const fetchProduct = async () => {
        const chached = await redis.get(params.id) // base64 for "home_page" (to not overlap with potential search queries)
        if (chached) {
            const ttl = await redis.ttl(params.id);
            setHeaders({ "cache-control": `max-age=${ttl}` });
            return JSON.parse(chached);
        }

        const res = await elastic.get({
            index: "products",
            id: params.id,
        });

        const product = res._source as Product;
        product.eid = res._id;

        redis.set(params.id, JSON.stringify(product), "EX", 600); // 10 minutes
        setHeaders({ "cache-control": "public, max-age=600" });
        
        return product;
    }

    return { product: fetchProduct() };
}) satisfies PageServerLoad;