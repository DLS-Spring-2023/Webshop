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

export type ShippingAddress = {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};

export type DeliveryMethod = {
    id: string;
    name: string;
    description: string;
    cost: number;
  };

export type CardDetails = {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
};