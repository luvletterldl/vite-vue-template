/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirective from '@unocss/transformer-directives'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    minify: 'terser',
    cssMinify: 'lightningcss',
  },
  css: {
    transformer: 'lightningcss',
  },
  plugins: [
    VueDevTools(),

    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          consola: [
            ['default', 'consola'],
          ],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/unplugin/unplugin-vue-components
    Components({
      resolvers: [IconsResolver(), ElementPlusResolver(), VantResolver()],
      dts: true,
    }),

    // https://github.com/unplugin/unplugin-icons
    Icons({
      autoInstall: true,
    }),

    // https://github.com/unocss/unocss
    // see unocss.config.ts for config
    Unocss({
      transformers: [
        transformerDirective(),
        transformerVariantGroup(),
      ],
    }),

  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
