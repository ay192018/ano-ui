import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { AnoDevResolver } from './resolvers'

export default defineConfig(({ command }) => {
  return {
    root: process.cwd(),
    resolve: {
      alias: {
        '~/': `${resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Components({
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/components.d.ts',
        resolvers: [AnoDevResolver(command)],
      }),
      UniPages({ routeBlockLang: 'yaml' }),
      Uni(),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', 'pinia', 'uni-app'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores'],
        vueTemplate: true,
      }),
    ],
  }
})