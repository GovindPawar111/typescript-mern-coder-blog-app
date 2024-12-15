import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
    console.log(mode)
    return {
        plugins: [react(), svgr()],
        base: !isDev ?  '/':'/typescript-mern-coder-blog-app/',
    }
})
