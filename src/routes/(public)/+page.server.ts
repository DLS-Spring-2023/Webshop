import type { Product } from "$lib/types/types";
import type { PageServerLoad } from "./$types";

type Section = { title: string; products: Product[] };
export const load: PageServerLoad = async ({fetch}) => {

    const fetchSectionData = async () => {
        const sections: Section[] = [
            {title: "Popular Items", products: []}, 
            {title: "New Arrivals", products: []}, 
            {title: "Best Sellers", products: []}, 
            {title: "Special Offers", products: []}, 
            {title: "On Sale", products: []}
        ];
        
        const promises: Promise<any>[] = [];
        for (const [i] of sections.entries()) {
            // const r = await fetch(`https://dummyjson.com/products?limit=10&skip=${i*10}`);
            // console.log(await r.json());
            
            promises.push(fetch(`https://dummyjson.com/products?limit=10&skip=${i*10}`));
        }
    
        const responses = await Promise.all(promises);
        for (const [i, response] of responses.entries()) {
            const products = await response.json();
            sections[i].products = products.products;
        }

        return sections;
    }


    return {
        sections: fetchSectionData(),
    }
    
};