import type { Cookies } from "@sveltejs/kit";
import type { LoginResponse } from "./interface";
import { AUTH_API_KEY } from "$env/static/private";
import Fetch from "./fetch";

interface AuthOptions {
    cookies?: Cookies
}

class Auth {
    
    private fetch: Fetch;

    constructor(options: AuthOptions) {
        this.fetch = new Fetch(options.cookies);
    }

    async loginUser(email: string, password: string): Promise<LoginResponse> {
        const response = await this.fetch.POST(`/user/login?API_KEY=${AUTH_API_KEY}`, {
            body: { email, password }
        });
        
        return response;
    }

    async registerUser(name: string, email: string, password: string): Promise<LoginResponse> {
        const response = await this.fetch.POST(`/user?API_KEY=${AUTH_API_KEY}`, {
            body: { name, email, password }
        });
        
        return response;
    }
}

export default Auth;
