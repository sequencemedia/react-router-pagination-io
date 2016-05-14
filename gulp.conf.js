module.exports =  {
	jshint: {
		all: ['client/app/**/*.js', 'client/src/app.js']
	},
	webpack: {
		run: require('./webpack.config')
	}
};