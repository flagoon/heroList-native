module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            components: './src/components',
            global: './src/globals',
            pages: './src/pages',
            helpers: './src/helpers',
          },
        },
      ],
      ['inline-dotenv'],
    ],
  };
};
