'use strict';

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = [
  {
    bail: true,
    devtool: 'source-map',
    mode: 'production',
    entry: [path.resolve(__dirname, './app/index.js')],
    output: {
      path: path.resolve(__dirname, './build1'),
      filename: 'static/js/[name].[chunkhash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      publicPath: '/',
      devtoolModuleFilenameTemplate: info =>
        path
          .relative(path.resolve(__dirname, './app'), info.absoluteResourcePath)
          .replace(/\\/g, '/'),
    },
    optimization: {
      minimize: false,
      concatenateModules: false,
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // Process JS with Babel.
            {
              test: /\.(js|jsx|mjs)$/,
              include: path.resolve(__dirname, './app'),
              loader: require.resolve('babel-loader'),
              options: {
                compact: true,
                presets: [['env', {modules: false}]],
              },
            },

            // "file" loader makes sure assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader: require.resolve('file-loader'),
              // Exclude `js` files to keep "css" loader working as it injects
              // it's runtime that would otherwise processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8,
          warnings: true,
          compress: false,
          mangle: false,
          output: {
            beautify: true,
            comments: true,
          },
        },
        sourceMap: true,
      }),
    ],
  },
  {
    bail: true,
    devtool: 'source-map',
    mode: 'production',
    entry: [path.resolve(__dirname, './app/index.js')],
    output: {
      path: path.resolve(__dirname, './build2'),
      filename: 'static/js/[name].[chunkhash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
      publicPath: '/',
      devtoolModuleFilenameTemplate: info =>
        path
          .relative(path.resolve(__dirname, './app'), info.absoluteResourcePath)
          .replace(/\\/g, '/'),
    },
    optimization: {
      minimize: false,
      concatenateModules: false,
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // Process JS with Babel.
            {
              test: /\.(js|jsx|mjs)$/,
              include: path.resolve(__dirname, './app'),
              loader: require.resolve('babel-loader'),
              options: {
                compact: true,
                presets: [['env', {modules: false}]],
              },
            },

            // "file" loader makes sure assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader: require.resolve('file-loader'),
              // Exclude `js` files to keep "css" loader working as it injects
              // it's runtime that would otherwise processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8,
          warnings: true,
          compress: true,
          mangle: false,
          output: {
            beautify: true,
            comments: true,
          },
        },
        sourceMap: true,
      }),
    ],
  },
];
