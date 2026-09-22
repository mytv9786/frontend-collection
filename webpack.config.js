// const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const appDirectory = path.resolve(__dirname);

// module.exports = {
//   entry: ['regenerator-runtime/runtime', path.join(__dirname, 'index.web.js')],
//   devtool: 'source-map',
//   output: {
//     path: path.resolve(appDirectory, 'dist'),
//     publicPath: '',
//     filename: 'rnw_blogpost.bundle.js',
//   },
//   resolve: {
//     extensions: ['.tsx', '.js', '.ts', '.web.tsx', '.web.ts', '.web.js'],
//     alias: {
//       'react-native$': 'react-native-web',
//       'react-native-vector-icons/dist/MaterialCommunityIcons':
//         'react-native-web/dist/exports/View',
//       'react-native-vector-icons/MaterialCommunityIcons':
//         'react-native-web/dist/exports/View',
//       'react-native-vector-icons': 'react-native-web/dist/exports/View',
//       '@react-native-vector-icons/material-design-icons':
//         'react-native-web/dist/exports/View',
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         resolve: {
//           fullySpecified: false,
//         },
//       },
//       {
//         test: /\.(js|jsx|ts|tsx)$/,
//         include: filePath => {
//           if (
//             filePath.includes(appDirectory) &&
//             !filePath.includes('node_modules')
//           ) {
//             return true;
//           }
//           if (
//             filePath.includes('node_modules/@react-navigation') ||
//             filePath.includes('node_modules/react-native') ||
//             filePath.includes('node_modules/@expo') ||
//             filePath.includes('node_modules/expo-') ||
//             filePath.includes('node_modules/react-native-vector-icons') ||
//             filePath.includes('node_modules/@expo/vector-icons') ||
//             filePath.includes('node_modules/@react-native-async-storage') ||
//             filePath.includes('node_modules/@react-native-picker/picker') ||
//             filePath.includes('node_modules/react-native-chart-kit') ||
//             filePath.includes('node_modules/react-native-svg') ||
//             filePath.includes('node_modules/lucide-react-native') ||
//             filePath.includes('node_modules/react-native-safe-area-context')
//           ) {
//             return true;
//           }
//           return false;
//         },
//         use: {
//           loader: 'babel-loader',
//           options: {
//             cacheDirectory: true,
//             presets: [
//               ['@babel/preset-env', { loose: true }],
//               '@babel/preset-react',
//               '@babel/preset-typescript',
//             ],
//             plugins: [
//               ['@babel/plugin-transform-class-properties', { loose: true }],
//               ['@babel/plugin-transform-private-methods', { loose: true }],
//               [
//                 '@babel/plugin-transform-private-property-in-object',
//                 { loose: true },
//               ],
//               'react-native-web',
//               '@babel/plugin-transform-modules-commonjs',
//             ],
//           },
//         },
//         resolve: {
//           fullySpecified: false,
//         },
//       },
//       {
//         test: /\.svg$/,
//         use: [{ loader: '@svgr/webpack' }],
//       },
//       {
//         test: /\.(gif|jpe?g|png)$/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             name: '[name].[ext]',
//           },
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, 'index.html'),
//     }),
//     new webpack.DefinePlugin({
//       __DEV__: JSON.stringify(true),
//     }),
//   ],
// };

// const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const appDirectory = path.resolve(__dirname);

// module.exports = {
//   entry: ['regenerator-runtime/runtime', path.join(__dirname, 'index.web.js')],
//   output: {
//     path: path.resolve(appDirectory, 'dist'),
//     publicPath: '',
//     filename: 'rnw_blogpost.bundle.js',
//   },
//   resolve: {
//     extensions: ['.tsx', '.web.tsx', '.web.ts', '.ts', '.web.js', '.js'],
//     alias: {
//       'react-native$': 'react-native-web',
//       // 💡 ఈ 4 లైన్స్ వెబ్ రన్‌టైమ్ క్రాష్ అవ్వకుండా ఐకాన్ ఇంపోర్ట్స్‌ను సేఫ్ గా రూట్ చేస్తాయి
//       'react-native-vector-icons/dist/MaterialCommunityIcons':
//         'react-native-web/dist/exports/View',
//       'react-native-vector-icons/MaterialCommunityIcons':
//         'react-native-web/dist/exports/View',
//       'react-native-vector-icons': 'react-native-web/dist/exports/View',
//       '@react-native-vector-icons/material-design-icons':
//         'react-native-web/dist/exports/View',
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         resolve: {
//           fullySpecified: false,
//         },
//       },
//       {
//         test: /\.(js|jsx|ts|tsx)$/,
//         include: filePath => {
//           if (
//             filePath.includes(appDirectory) &&
//             !filePath.includes('node_modules')
//           ) {
//             return true;
//           }
//           if (
//             filePath.includes('node_modules/@react-navigation') ||
//             filePath.includes('node_modules/react-native') ||
//             filePath.includes('node_modules/@expo') ||
//             filePath.includes('node_modules/expo-') ||
//             filePath.includes('node_modules/react-native-vector-icons') ||
//             filePath.includes('node_modules/@expo/vector-icons') ||
//             filePath.includes('node_modules/@react-native-picker/picker') ||
//             filePath.includes('node_modules/react-native-chart-kit') ||
//             filePath.includes('node_modules/react-native-svg') ||
//             filePath.include(
//               'node_modules/@react-native-async-storage/async-storage',
//             ) ||
//             filePath.includes('node_modules/lucide-react-native')
//           ) {
//             return true;
//           }
//           return false;
//         },
//         use: {
//           loader: 'babel-loader',
//           options: {
//             cacheDirectory: true,
//             // 💡 ఇక్కడ రూట్ బాబెల్ ఫైల్ ప్రెసెట్స్ కాకుండా నేరుగా వెబ్ ప్రెసెట్స్ ఇచ్చాము
//             presets: [
//               ['@babel/preset-env', { loose: true }],
//               '@babel/preset-react',
//               '@babel/preset-typescript',
//             ],
//             plugins: [
//               ['@babel/plugin-transform-class-properties', { loose: true }],
//               ['@babel/plugin-transform-private-methods', { loose: true }],
//               [
//                 '@babel/plugin-transform-private-property-in-object',
//                 { loose: true },
//               ],
//               'react-native-web',
//               '@babel/plugin-transform-modules-commonjs',
//             ],
//           },
//         },
//         resolve: {
//           fullySpecified: false,
//         },
//       },
//       {
//         test: /\.svg$/,
//         use: [{ loader: '@svgr/webpack' }],
//       },
//       {
//         test: /\.(gif|jpe?g|png)$/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             name: '[name].[ext]',
//           },
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, 'index.html'),
//     }),
//     new webpack.DefinePlugin({
//       __DEV__: JSON.stringify(true),
//     }),
//   ],
// };

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

module.exports = {
  entry: ['regenerator-runtime/runtime', path.join(__dirname, 'index.web.js')],
  devtool: 'source-map', // ← ఇది add చేయండి
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '',
    filename: 'rnw_blogpost.bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.web.tsx', '.web.ts', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-vector-icons/dist/MaterialCommunityIcons':
        'react-native-web/dist/exports/View',
      'react-native-vector-icons/MaterialCommunityIcons':
        'react-native-web/dist/exports/View',
      'react-native-vector-icons': 'react-native-web/dist/exports/View',
      '@react-native-vector-icons/material-design-icons':
        'react-native-web/dist/exports/View',
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: filePath => {
          if (
            filePath.includes(appDirectory) &&
            !filePath.includes('node_modules')
          ) {
            return true;
          }
          if (
            filePath.includes('node_modules/@react-navigation') ||
            filePath.includes('node_modules/react-native') ||
            filePath.includes('node_modules/@expo') ||
            filePath.includes('node_modules/expo-') ||
            filePath.includes('node_modules/react-native-vector-icons') ||
            filePath.includes('node_modules/@expo/vector-icons') ||
            filePath.includes('node_modules/@react-native-async-storage') ||
            filePath.includes('node_modules/@react-native-picker/picker') ||
            filePath.includes('node_modules/react-native-chart-kit') ||
            filePath.includes('node_modules/react-native-svg') ||
            filePath.includes('node_modules/lucide-react-native') ||
            filePath.include('node_modules/@react-navigation/stack') ||
            filePath.include('node_modules/react-native-gesture-handler')
          ) {
            return true;
          }
          return false;
        },
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['@babel/preset-env', { loose: true, modules: false }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-transform-class-properties', { loose: true }],
              ['@babel/plugin-transform-private-methods', { loose: true }],
              [
                '@babel/plugin-transform-private-property-in-object',
                { loose: true },
              ],
              'react-native-web',
              // 💡 ఇక్కడి నుండి CommonJS ప్లగిన్‌ను పూర్తిగా తొలగించాము
            ],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack' }],
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.DefinePlugin({
      // 💡 ఇది బిల్డ్ మోడ్‌ని బట్టి DEV ఎన్విరాన్‌మెంట్‌ను ఆటోమేటిక్‌గా సెట్ చేస్తుంది
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
  ],
};
