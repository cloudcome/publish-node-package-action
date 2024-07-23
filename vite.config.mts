import { externalizeDeps } from 'vite-plugin-externalize-deps';
import { defineConfig } from 'vitest/config';
import pkg from './package.json';

/**
 * vite config
 * @ref https://vitejs.dev/
 * vitest config
 * @ref https://vitest.dev/
 */
export default defineConfig({
    plugins: [
        // plugins
        externalizeDeps(),
    ],
    define: {
        'process.env.PKG_NAME': JSON.stringify(pkg.name),
        'process.env.PKG_VERSION': JSON.stringify(pkg.version),
    },
    build: {
        minify: false,
        sourcemap: false,
        copyPublicDir: false,
        reportCompressedSize: false,
        lib: {
            entry: {
                index: 'src/index.ts',
            },
        },
        rollupOptions: {
            output: [
                {
                    format: 'cjs',
                    entryFileNames: '[name].cjs',
                    chunkFileNames: '[name].cjs',
                },
            ],
        },
    },
    test: {
        globals: true,
        env: {
            PKG_NAME: 'pkg-name-for-test',
            PKG_VERSION: 'pkg-version-for-test',
        },
        coverage: {
            all: true,
            include: ['src/**/*.ts'],
            reporter: ['lcov', 'text'],
        },
    },
});
