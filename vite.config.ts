import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { createHtmlPlugin } from "vite-plugin-html"
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: "orderly",
          description: "Your custom app description"
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      external: [], // Block external scripts
      output: {
        manualChunks: undefined
      }
    }
  }
})