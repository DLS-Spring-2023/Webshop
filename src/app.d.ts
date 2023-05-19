// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authenticated: boolean;
			user_id?: string;
			theme: string | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
