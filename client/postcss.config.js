const postcssPresetEnv = require('postcss-preset-env');
const url = require('postcss-url');
const cssnano = require('cssnano');

const plugins = [
  postcssPresetEnv({
    // No need to specify using autoprefixer, but it remind that we use autoprefixer
    // Browserlist is written in package.json
    autoprefixer: true,
    preserve: false,
    features: {
      'custom-properties': {
        importFrom: ['./src/const/colors.css', './src/const/fonts.css']
      },
      'custom-media-queries': {
        importFrom: ['./src/const/mediaQueries.css']
      },
    },
  }),
  url(),
  cssnano(),
];

module.exports = {
  plugins,
};
