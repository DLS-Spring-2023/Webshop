import { browser } from '$app/environment';
import type { CartItem, Product } from '$lib/types/types';
import { writable } from 'svelte/store';

class CartStore {
    cart = writable<CartItem[]>([]);

    constructor() {
        if (!browser) return;
    
        if (!sessionStorage.getItem('cart')) {
            sessionStorage.setItem('cart', JSON.stringify([]));
        }

        this.cart.set(JSON.parse(sessionStorage.getItem('cart') || '[]'));
    }

    // Adds a product to the cart or updates its quantity if it already exists.
    addToCart(product: Product) {
        if (!browser) return;

        this.cart.update((cart: CartItem[]) => {
            const index = cart.findIndex((item: CartItem) => item.id === product.id);
        
            if (index === -1) {
                cart.push({ 
                    eid: product.eid,
                    id: product.id, 
                    title: product.title, 
                    price: product.price,
                    quantity: 1, 
                    thumbnail: product.thumbnail,
                });
            } else {
                cart[index].quantity += 1;
            }
        
            sessionStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        });
    }
  
    // Removes a product from the cart.
    removeFromCart(productId: number) {
        if (!browser) return;

        this.cart.update((cart: CartItem[]) => {
            const index = cart.findIndex((item: CartItem) => item.id === productId);
        
            if (index !== -1) {
                cart.splice(index, 1);
            }
        
            sessionStorage.setItem('cart', JSON.stringify(cart));
            return cart;
        });
    }

    increaseQuantity(productId: number) {
        if (!browser) return;

        this.cart.update((cart: CartItem[]) => {
            const index = cart.findIndex((item: CartItem) => item.id === productId);

            if (index !== -1) {
                cart[index].quantity += 1;
                sessionStorage.setItem('cart', JSON.stringify(cart));
            }

            return cart;
        });
    }
  
    // Decreases the quantity of a product in the cart down to a minimum of one.
    decreaseQuantity(productId: number) {
        if (!browser) return;

        this.cart.update((cart: CartItem[]) => {
            const index = cart.findIndex((item: CartItem) => item.id === productId);

            if (index !== -1 && cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                sessionStorage.setItem('cart', JSON.stringify(cart));
            }

            return cart;
        });
    }

    clear() {
        this.cart.set([]);
        sessionStorage.setItem('cart', JSON.stringify([]));
    }
}

export default new CartStore();



