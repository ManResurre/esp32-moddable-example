import {defineConfig, loadEnv} from "vite";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, ".", "");
    return {
        root: ".",
        build: {
            outDir: "dist",
            rollupOptions: {
                input: "index.html",
                output: {
                    entryFileNames: "bundle.js",
                    chunkFileNames: "bundle.js",
                    assetFileNames: "bundle.[ext]",
                },
            },
        },
        server: {
            proxy: {
                "/api": {
                    target: `http://${env.ESP_IP}`,
                    changeOrigin: true,
                },
                "/b": {
                    target: `http://${env.ESP_IP}`,
                    changeOrigin: true,
                },
            },
        },
    };
});
