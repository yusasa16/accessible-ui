import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pugPlugin from '@macropygia/vite-plugin-pug-static'
import inputPlugin from '@macropygia/vite-plugin-glob-input'

const root = resolve(__dirname, 'htdocs');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

// https://vitejs.dev/config/
export default defineConfig({
	root,
	publicDir,

  build: {
    outDir,
		rollupOptions: {
			// inputPluginというプラグインに置き換え
			// input: {
			// 	index: resolve(root, 'index.pug'),
			// 	about: resolve(root, 'about', 'index.pug')
			// }
		}
  },

	server: {
		host: true,
		port: 3000,
	},

  plugins: [
		vue(),
		pugPlugin({
			buildOptions: {
				basedir: root,
			},
			serveOptions: {
				basedir: root,
			}
		}),
		inputPlugin({
			patterns: [
				`${root}/**/[^_]*.pug`,
				`${root}/**/*.html`,
			],
			options: {
				ignore: [
					`${root}/**/*_bk.html`
				]
			}
		}),
	],

	resolve: {
		alias: {
			'vue': 'vue/dist/vue.esm-bundler.js',
		},
	},
})

// pug関係参考
// https://qiita.com/macropygia/items/d37fd20a16fcef26914b
