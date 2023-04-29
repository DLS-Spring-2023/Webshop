export type Product = {
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