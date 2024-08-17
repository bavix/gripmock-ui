import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
    },
    base: './',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'ra': ['ra-core'],
                    'react': ['react', 'react-dom'],
                    'react-admin': ['react-admin'],
                    'react-admin-utils': ['@bavix/react-admin-json-view'],
                    'mui': ['@mui/material', '@mui/icons-material'],
                    'utils': ['lodash/orderBy', 'lodash/filter', 'lodash/iteratee'],
                    'matches': ['fuse.js'],
                },
            },
        }
    }
});
