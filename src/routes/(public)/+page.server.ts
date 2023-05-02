import { redis } from "$lib/server/redis/Redis";
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

        const sections: Section[] = [
            {title: "Popular Items", products: []}, 
            {title: "New Arrivals", products: []}, 
            {title: "Best Sellers", products: []}, 
            {title: "Special Offers", products: []}, 
            {title: "On Sale", products: []}
        ];
        
        const promises: Promise<any>[] = [];
        for (const [i] of sections.entries()) {
            promises.push(fetch(`https://dummyjson.com/products?limit=10&skip=${i*10}`));
        }
    
        const responses = await Promise.all(promises);
        for (const [i, response] of responses.entries()) {
            const products = await response.json();
            sections[i].products = products.products;
        }

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
        console.log(theme);
        
        if (theme) {
            cookies.set("theme", theme, {
                path: "/",
                maxAge: 60 * 60 * 24 * 365, // 1 year
                httpOnly: true,
                secure: true,
            });
        }
    },
};