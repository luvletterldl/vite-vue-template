/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirective from '@unocss/transformer-directives'
import basicSsl from '@vitejs/plugin-basic-ssl'
import Inspect from 'vite-plugin-inspect'
import Inspector from 'unplugin-vue-inspector/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    Inspector(),

    Inspect(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'vue/macros',
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

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()],
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      transformers: [
        transformerDirective(),
        transformerVariantGroup(),
      ],
    }),

    basicSsl(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },

  server: {
    https: true,
  },
})
