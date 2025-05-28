export const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|avif)$/i, //svg додай якщо потрібно
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,

  png: {
    quality: 75, // Устанавливаем качество PNG на 75
  },
  jpeg: {
    quality: 75, // Устанавливаем качество JPEG на 75
  },
  jpg: {
    quality: 75, // Устанавливаем качество JPG на 75
  },
  tiff: {
    quality: 75, // Устанавливаем качество TIFF на 75
  },
  gif: {},
  webp: {
    quality: 75, // Устанавливаем качество WEBP на 75
  },
  avif: {
    quality: 75, // Устанавливаем качество AVIF на 75
  },
  // svg: {
  //   multipass: true,
  //   plugins: [
  //     {
  //       name: 'preset-default',
  //       params: {
  //         overrides: {
  //           cleanupNumericValues: false,
  //           removeViewBox: false,
  //         },
  //         cleanupIDs: {
  //           minify: false,
  //           remove: false,
  //         },
  //         convertPathData: false,
  //       },
  //     },
  //     'sortAttrs',
  //     {
  //       name: 'addAttributesToSVGElement',
  //       params: {
  //         attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
  //       },
  //     },
  //   ],
  // },
  cache: false,
  cacheLocation: undefined,
};
