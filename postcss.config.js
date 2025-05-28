export default {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 16, // 1rem = 16px
      unitPrecision: 5, // Количество знаков после запятой
      propList: ['*', '!font-size'], // Преобразовывать все свойства
      selectorBlackList: [], // Селекторы, которые нужно исключить из преобразования
      replace: true, // Заменять px на rem
      mediaQuery: true, // Преобразовывать px внутри media queries
      minPixelValue: 0, // Минимальное значение px для преобразования
      exclude: /node_modules/i,
    },
  },
};
