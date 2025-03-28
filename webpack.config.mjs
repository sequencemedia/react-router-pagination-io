import path from 'path'

import Webpack from 'webpack'

import {
  CleanWebpackPlugin
} from 'clean-webpack-plugin'

import TerserPlugin from 'terser-webpack-plugin'

const {
  EnvironmentPlugin,
  SourceMapDevToolPlugin
} = Webpack

const clientPath = path.resolve('./client')
const assetsPath = path.resolve('./public/assets/js')

const {
  env: {
    NODE_ENV = 'production'
  } = {}
} = process

export default function common (env, { mode = NODE_ENV } = {}) {
  return {
    mode,
    entry: {
      app: {
        import: [
          path.resolve(clientPath, 'index.jsx')
        ],
        dependOn: [
          'vendors'
        ]
      },
      vendors: [
        'react',
        'react-dom',
        'prop-types',
        'react-redux',
        'react-router',
        'redux',
        'redux-saga'
      ]
    },
    output: {
      path: assetsPath,
      filename: '[name].js'
    },
    stats: {
      colors: true
    },
    module: {
      rules: [
        {
          test: /\.(mjs|cjs|jsx|mts|cts|tsx)?$/,
          use: {
            loader: 'babel-loader'
          },
          exclude: /node_modules\/(?!react-router-pagination)/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: false,
        cleanOnceBeforeBuildPatterns: [
          path.join(assetsPath, '*.js'),
          path.join(assetsPath, '*.js.map')
        ]
      }),
      new EnvironmentPlugin({ NODE_ENV }),
      new SourceMapDevToolPlugin({ filename: '[name].js.map' })
    ],
    optimization: {
      runtimeChunk: 'single',
      minimize: true,
      minimizer: [
        new TerserPlugin()
      ]
    },
    experiments: {
      backCompat: false
    }
  }
}
