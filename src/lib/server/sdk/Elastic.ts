import { ELASTIC_PASS, ELASTIC_URL, ELASTIC_USER } from '$env/static/private';
import type { Product } from '$lib/types/types';
import { Client } from '@elastic/elasticsearch';

export const elastic = new Client({ 
    node: ELASTIC_URL,
    headers: { 
        'Authorization': 'Basic ' + Buffer.from(`${ELASTIC_USER}:${ELASTIC_PASS}`).toString('base64') 
    }
});

export const getHomePageResults = (async () => {
    const response = await elastic.search({
        index: "products",
        size: 51,
        body: {
            query: {
                match_all: {}
            }
        }
    }).catch(() => ({ hits: { hits: [] } }));

    return response.hits.hits.map((hit) => ({ ...hit._source as Product, eid: hit._id })) as Product[];
});