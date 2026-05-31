import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' 

// https://vite.dev/config/
export default defineConfig({
  server: {
    // 允许所有主机访问（有安全风险，请勿在生产环境使用）
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://backend:6000',
        changeOrigin: true
      },
      '/api2': {
        target: 'http://backend:6000',
        changeOrigin: true
      },
      '/api3': {
        target: 'http://backend:6000',
        changeOrigin: true
      },
      '/api4': {
        target: 'http://backend:6000',
        changeOrigin: true
      },
      '/api5': {
        target: 'http://backend:6000',
        changeOrigin: true
      }
    }
  },
    // 1. 核心配置：告诉 Vite 把 src/assets 当作 public 目录处理
  publicDir: path.resolve(__dirname, 'src/assets'),
  base: '/ffsdb/',
  // 2. 确保复制功能开启 (Vite 5.1+ 默认为 true，写上更保险)
  build: {
    copyPublicDir: true, 
  },
  plugins: [vue()],
})
