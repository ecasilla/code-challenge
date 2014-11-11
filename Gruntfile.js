'use strict';
/*
 * manuscript
 * http://github.com/ecasilla
 *
 * Copyright (c) 2014 Ernie Casilla. All rights reserved.
 */


module.exports = function (grunt) {
	grunt.initConfig({
		jsbeautifier: {
			files: ['<%= jshint.all %>'],
			options: {
				config: '.jsbeautify'
			}
		},
		simplemocha: {
			options: {
				globals: ['should', 'navigator'],
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec'
			},
			all: {
				src: 'test/**/*.js'
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'index.js',
				'!app/doc/**/*.js',
				'test/**/*.js',
				'package.json',
			]
		},
		jsdoc: {
			dist: {
				src: ['test/**/*.js', 'index.js'],
				options: {
					destination: 'doc/html',
					configure: 'jsdoc.json'
				}
			}
		},
		watch: {
			options: {
				interrupt: true
			},
			js: {
				files: ['<%= jshint.all %>'],
				tasks: ['newer:simplemocha:all', 'newer:jshint:all', 'newer:jsbeautifier', 'doc']
			}
		}
	});

	// Loading dependencies
	for (var key in grunt.file.readJSON('package.json').devDependencies) {
		if (key.indexOf('grunt') === 0 && key !== 'grunt') {
			grunt.loadNpmTasks(key);
		}
	}
	grunt.registerTask('doc', 'jsdoc');
	grunt.registerTask('test', 'simplemocha');
	grunt.registerTask('lint', 'jshint');
	grunt.registerTask('default', ['lint', 'doc', 'test' ]);
};
