const slsw = require('serverless-webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: '../tsconfig.json'
            }
          }

        ],

      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
};
