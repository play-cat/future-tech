import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { globSync } from 'glob';
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';
import viteCompression from 'vite-plugin-compression';
import { viteStaticCopy } from 'vite-plugin-static-copy';
// оптимізація картинок
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { optimizeImages } from './imageOptimizer';
import { wrapImgWithPicture } from './wrapImgWithPicture';
import { DEFAULT_OPTIONS } from './imageOptimizerConfig';
// приклад підключення JSON файлу для шаблонів handlebars
// import products from './src/data/products.json';
import footerMenu from './src/assets/data/footer-menu-links.json';
import advantageCards from './src/assets/data/advantage-cards-data.json';
import testimonialsCards from './src/assets/data/testimonials-cards-data.json';
import videosCards from './src/assets/data/videos-cards-data.json';
import latestPodcastCards from './src/assets/data/latest-podcasts-data.json';

const __dirname = dirname(fileURLToPath(import.meta.url));

// пошук усіх файлів сторінок html в корені
const htmlPages = globSync('*.html');
// Формуємо об'єкт для Rollup, щоб автоматично підхоплювати сторінки
const inputPages = htmlPages.reduce((entries, page) => {
  const pageName = page.replace(/\.html$/, '');
  entries[pageName] = resolve(__dirname, page);
  return entries;
}, {});

export default defineConfig({
  // base: '/future-tech/',

  css: {
    devSourcemap: true, // Увімкнення сорс-мап у режимі розробки
    preprocessorOptions: {
      scss: {
        sourceMap: true, // Явно вказуємо, що SCSS повинен генерувати сорс-мапи
      },
    },
  },

  plugins: [
    handlebars({
      partialDirectory: [
        resolve(__dirname, 'partials'),
        resolve(__dirname, 'partials/templates'),
        resolve(__dirname, 'partials/home'),
        resolve(__dirname, 'partials/news'),
        resolve(__dirname, 'partials/blog'),
        resolve(__dirname, 'partials/podcasts'),
        resolve(__dirname, 'partials/resources'),
        resolve(__dirname, 'partials/contacts'),
      ],

      reloadOnPartialChange: true,
      context: {
        footerMenu,
        advantageCards,
        testimonialsCards,
        videosCards,
        latestPodcastCards,
      },
      helpers: {
        forLoop: function (n, options) {
          let result = '';
          for (let i = 0; i < n; i++) {
            result += options.fn(i);
          }
          return result;
        },
        subtract: function (a, b) {
          return a - b;
        },
        lessThan: function (value, threshold) {
          return value < threshold;
        },
      },
    }),

    ViteImageOptimizer(DEFAULT_OPTIONS), // оптимізація картинок

    {
      name: 'optimize-images-and-wrap',
      closeBundle: async () => {
        await optimizeImages();
        await wrapImgWithPicture();
      },
    },

    // Плагин для сжатия файлов
    // viteCompression({
    //   algorithm: "brotliCompress",
    // }),

    ViteSvgSpriteWrapper({
      //Input directory
      // @default 'src/assets/images/svg/*.svg'
      icons: 'src/assets/icons/svg/*.svg',
      // Output directory
      // @default 'src/public/images'
      outputDir: 'src/assets/icons',

      // defaul use
      //<svg class="icon" aria-hidden="true">
      //   <use xlink:href="/images/sprite.svg#star"></use>
      //</svg>
    }),

    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'src/assets/img/**/*', // шлях до файлів у src
    //       dest: 'assets/img', // куди копіювати в dist/
    //     },
    //   ],
    // }),
  ],

  build: {
    outDir: 'docs',
    emptyOutDir: true, // очищує папку dist перед створенням нових файлів
    assetsInlineLimit: 0, // щоб запобігти інлайнінгу svg файлів
    rollupOptions: {
      input: inputPages,
      output: {
        assetFileNames: assetInfo => {
          const ext = assetInfo.name?.split('.').pop();
          if (ext === 'css' || ext === 'scss') {
            return 'assets/styles/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    open: true,
  },
});
