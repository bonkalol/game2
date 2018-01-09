const path = require('path');

module.exports = {
	entry: path.join(process.cwd(), 'app/ts/index.ts'),
	output: {
		filename: 'dist/js/app.js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	devtool: 'source-map',

	module: {
		loaders: [{
			test: /\.tsx?$/,
			loader: 'awesome-typescript-loader'
		}]
	},
};