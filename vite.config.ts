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
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/constants': '/src/constants',
      '@/hooks': '/src/hooks',
      '@/pages': '/src/pages',
      '@/providers': '/src/providers',
      '@/routes': '/src/routes',
      '@stores': '/src/stores',
      '@/themes': '/src/themes',
      '@/types': '/src/types',
      '@/utils': '/src/utils',
    },
  },
});