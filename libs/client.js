import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'mf7cli-blog',
  apiKey: process.env.API_KEY,
});