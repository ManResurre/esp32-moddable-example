import { defineConfig } from "vite";

export default defineConfig({
	root: ".",
	build: {
		outDir: "dist",
		rollupOptions: {
			input: "dev.html",
			output: {
				entryFileNames: "bundle.js",
				chunkFileNames: "bundle.js",
				assetFileNames: "bundle.[ext]",
			},
		},
	},
});
