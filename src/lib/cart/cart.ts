export type CartItem = {
    id: number;
    quantity: number;
};

// Adds a product to the cart or updates its quantity if it already exists.
export const addToCart = (productId: number) => {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '') || [];
    const index = cart.findIndex((item: CartItem) => item.id === productId);
    
    if (index === -1) {
        cart.push({ id: productId, quantity: 1 });
    } else {
        cart[index].quantity += 1;
    }
    
    sessionStorage.setItem('cart', JSON.stringify(cart));
}
  
// Removes a product from the cart.
export const removeFromCart = (productId: number) => {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '') || [];
    const index = cart.findIndex((item: CartItem) => item.id === productId);
  
    if (index !== -1) {
        cart.splice(index, 1);
    }
  
    sessionStorage.setItem('cart', JSON.stringify(cart));
}
  
// Decreases the quantity of a product in the cart down to a minimum of one.
export const decreaseQuantity = (productId: number) => {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '') || [];
    const index = cart.findIndex((item: CartItem) => item.id === productId);

    if (index !== -1 && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const existsInCart = (productId: number) => {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '') || [];
    const index = cart.findIndex((item: CartItem) => item.id === productId);
    return index !== -1;
}

export const getCart = () => {
    return JSON.parse(sessionStorage.getItem('cart') || '') || [] as CartItem[];
}