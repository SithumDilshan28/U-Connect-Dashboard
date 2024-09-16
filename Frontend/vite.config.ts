import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: 'localhost',
        port: 5173,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
