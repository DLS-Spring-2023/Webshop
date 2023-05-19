import { elastic, getHomePageResults } from "$lib/server/sdk/Elastic";
import { redis } from "$lib/server/sdk/Redis";
import type { Product } from "$lib/types/types";
import type { Actions, PageServerLoad } from "./$types";

type Section = { title: string; products: Product[] };
export const load: PageServerLoad = async ({ fetch, setHeaders }) => {

    const fetchSectionData = async () => {
        const chached = await redis.get("aG9tZV9wYWdl") // base64 for "home_page" (to not overlap with potential search queries)
        if (chached) {
            const ttl = await redis.ttl("aG9tZV9wYWdl");
            setHeaders({ "cache-control": `max-age=${ttl}` });
            return JSON.parse(chached);
        }

        const data = await getHomePageResults();

        const sections: Section[] = [
            {title: "Popular Items", products: data.slice(0, 10)}, 
            {title: "New Arrivals", products: data.slice(10, 20)}, 
            {title: "Best Sellers", products: data.slice(20, 30)},
            {title: "Special Offers", products: data.slice(30, 40)}, 
            {title: "On Sale", products: data.slice(40, 50)},
        ];

        redis.set("aG9tZV9wYWdl", JSON.stringify(sections), "EX", 600); // 10 minutes
        setHeaders({ "cache-control": "public, max-age=600" });
        
        return sections;
    }

    return {
        sections: fetchSectionData(),
    }
    
};

export const actions: Actions = {
    setTheme: ({url, cookies}) => {
        const theme = url.searchParams.get("theme");
        
        if (theme) {
            cookies.set("theme", theme, {
                path: "/",
                maxAge: 60 * 60 * 24 * 365, // 1 year
                httpOnly: true,
                secure: true,
            });
        }
    },

    search: async ({request, fetch, setHeaders}) => {
        const form = await request.formData();
        const q = form.get("q");

        if (!q || typeof q !== 'string') return [];

        const chached = await redis.get(q);
        if (chached) {
            const ttl = await redis.ttl(q);
            setHeaders({ "cache-control": `max-age=${ttl}` });
            return JSON.parse(chached);
        }

        const result = await elastic.search({
            index: 'products',
            query: {
                multi_match: {
                    query: q + "*",
                    fields: ["title", "brand", "category", "description"],
                    fuzziness: "1",
                }
            }
        });
        
        const data = result.hits.hits.map((hit) => ({ ...hit._source as Product, eid: hit._id }));

        redis.set(q, JSON.stringify(data), "EX", 600); // 10 minutes
        setHeaders({ "cache-control": "public, max-age=600" });

        return data as Product[];
    }
};