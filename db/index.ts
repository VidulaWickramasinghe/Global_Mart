import { env } from 'cloudflare:workers';
export function database(){if(!env.DB)throw new Error('The store is temporarily unavailable. Please try again shortly.');return env.DB;}
