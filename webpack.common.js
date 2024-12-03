const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/scripts/index.js'),
		// sw: path.resolve(__dirname, 'src/scripts/sw.js'),
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 20000,
			maxSize: 70000,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			automaticNameDelimiter: '~',
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	plugins: [
		new BundleAnalyzerPlugin(),
		new ImageminWebpackPlugin({
			plugins: [
				ImageminMozjpeg({
					quality: 50,
					progressive: true,
				}),
			],
		}),
		,
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/public'),
					to: path.resolve(__dirname, 'dist'),
					globOptions: {
						// CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
						ignore: ['**/images/**'],
					},
				},
			],
		}),
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: path.resolve(__dirname, 'src/public/'),
		// 			to: path.resolve(__dirname, 'dist/'),
		// 			globOptions: {
		// 				ignore: ['**/images/**'],
		// 			},
		// 		},
		// 		{
		// 			from: path.resolve(__dirname, 'src/public/images/'),
		// 			to: path.resolve(__dirname, 'dist/images/'),
		// 		},
		// 		{
		// 			from: path.resolve(__dirname, 'src/public/app.webmanifest'),
		// 			to: path.resolve(__dirname, 'dist/'),
		// 		},
		// 	],
		// }),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/templates/index.html'),
		}),
		new WorkboxWebpackPlugin.GenerateSW({
			swDest: './sw.bundle.js',
			runtimeCaching: [
				{
					// Cache daftar restoran dari endpoint "/list"
					urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list'),
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'dicoding-restaurant-list',
					},
				},
				{
					// Cache detail restoran berdasarkan endpoint "/detail/:id"
					urlPattern: ({ url }) => url.href.includes('https://restaurant-api.dicoding.dev/detail'),
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'dicoding-restaurant-detail',
					},
				},
				{
					// Cache pencarian restoran dari endpoint "/search?q="
					urlPattern: ({ url }) => url.href.includes('https://restaurant-api.dicoding.dev/search'),
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'dicoding-restaurant-search',
					},
				},
				{
					// Cache gambar restoran dengan pattern URL "https://restaurant-api.dicoding.dev/images/"
					urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/'),
					handler: 'CacheFirst',
					options: {
						cacheName: 'dicoding-restaurant-images',
						expiration: {
							maxEntries: 50,
							maxAgeSeconds: 30 * 24 * 60 * 60,
						},
					},
				},
			],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/public/'),
					to: path.resolve(__dirname, 'dist/'),
				},
			],
		}),
	],
};
