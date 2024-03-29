import Jwt from 'jsonwebtoken'
import type { LoginResponse, User } from "./interface";
import { redirect, type Cookies, type RequestEvent } from "@sveltejs/kit";
import { AUTH_API_KEY, AUTH_PROJECT_ID } from "$env/static/private";
import Fetch from "./fetch";

interface AuthOptions {
    cookies?: Cookies
}

class Auth {

    private static PUBLIC_KEY: string | undefined;

    private fetch: Fetch;
    private event: RequestEvent;

    constructor(event: RequestEvent) {
        this.fetch = new Fetch(event.cookies);
        this.event = event;
    }

    private static async getPublicKey() {
        if (this.PUBLIC_KEY) return this.PUBLIC_KEY;
        
        const apiCall = new Fetch();
        const response = await apiCall.GET('/keys/project/' + AUTH_PROJECT_ID);
        if (!response.error) {
            this.PUBLIC_KEY = response.data?.publicKey;
        }
        
        return this.PUBLIC_KEY;
    }

    static async verifyUser(event: RequestEvent): Promise<{ authenticated: boolean, user_id?: string }> {
        const accessToken = event.cookies.get('access_token');
        const refreshToken = event.cookies.get('refresh_token');

        // If the access token is not present, but the refresh token is, then refresh the access token
        if (!accessToken && refreshToken) {
            const auth = new Auth(event);
            await auth.refresh();
        }

        // Verify access token
        let verified: { sub: string } | null = null;
        if (accessToken) {
            const publicKey = await this.getPublicKey();
            
            if (publicKey) {
                verified = await new Promise((resolve) => {
                    Jwt.verify(accessToken, publicKey, (err, decoded) => {
                        if (err) {
                            console.log(err);
                            return resolve(null);        
                        } else {
                            // console.log(decoded);
                            
                            return resolve(decoded as { sub: string });
                        }
                    });
                });
            }
        }

        if (!verified) {
            event.cookies.delete('access_token');
            event.cookies.delete('refresh_token');
        }

        // redirect to login if not logged in and trying to access protected content
        if (!event.cookies.get('access_token') && event.route.id?.startsWith('/(protected)')) {
            const search = event.url.pathname + event.url.search;
            const ref = Buffer.from(search).toString('base64');
                
            const dec = Buffer.from(ref, 'base64');
            
            throw redirect(302, `/login?ref=${ref}`);
        } else if (event.cookies.get('access_token') && event.route.id?.startsWith('/(auth)')) {
            throw redirect(302, '/');
        }

        return {
            authenticated: !!event.cookies.get('access_token'),
            user_id: verified?.sub as string
        }
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

    async refresh(): Promise<void> {
        await this.fetch.GET(`/user?API_KEY=${AUTH_API_KEY}`);
    }

    async getUser(): Promise<User> {
        const response = await this.fetch.GET(`/user?API_KEY=${AUTH_API_KEY}`);
        return response.data;
    }

    async logoutUser(): Promise<void> {
        await this.fetch.POST(`/user/logout?API_KEY=${AUTH_API_KEY}`);
        this.event.cookies.delete('access_token');
        this.event.cookies.delete('refresh_token');
    }

    async updateUser({name, email} : { name: string, email: string }) {
        return await this.fetch.PUT(`/user?API_KEY=${AUTH_API_KEY}`, {
            body: { name, email }
        });
    }
    
}

export default Auth;
