export type Product = {
    eid: string;
    id: number;
    title: string;
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    images: string[];
    price: number;
    stock: number;
    thumbnail: string;
}

export type CartItem = {
    eid: string;
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
};

export type Account = {
    id: string;
    email: string;
    name: string;
    address: string;
    phone: string;
}