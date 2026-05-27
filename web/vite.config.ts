import { defineConfig } from "vite";

export default defineConfig({
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
});
