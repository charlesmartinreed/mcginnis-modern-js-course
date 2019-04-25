var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

//@babel-polyfill makes sure we have everything we need for backwards compatibility for features that might not be supported in a user's antiquated browser

module.exports = {
	entry: ['@babel/polyfill', './app/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader'},
			{ test: /\.css$/, use: ['style-loader', 'css-loader']}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/index.html'
		})
	]
}
