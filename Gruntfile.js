module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    unit: 'node ./test/streamTest.js',
    fhignore: ['res/**']
  });

  grunt.loadNpmTasks('grunt-fh-build');
  grunt.registerTask('default', ['jshint', 'fh:test', 'fh:analysis', 'fh:dist']);
};
