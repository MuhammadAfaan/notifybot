
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
          title: "NotifyBot",
          description: "WhatsApp Order Management System"
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    port: 8080
  }
})
