import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/**/*',
          dest: 'assets'
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@apis': '/src/apis',
      '@/app': '/src/app',
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/constants': '/src/constants',
      '@/features': '/src/features',
      '@/hooks': '/src/hooks',
      '@/pages': '/src/pages',
      '@/routes': '/src/routes',
      '@stores': '/src/stores',
      '@/themes': '/src/themes',
      '@/utils': '/src/utils',
      '@/types': '/src/types',
    },
  },
});