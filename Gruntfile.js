module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'decrypt/**/*.js'
      ]
    },
    cipher: {
      options: {
        pk:grunt.cli.options.pk||grunt.file.read('.pk')
      },
      encrypt: {
        files: [{
          expand:true,
          cwd:'decrypt/',
          src:['**/*'],
          dest:'encrypt/'
        }]
      },      
      decrypt: {
        options: {
          method:'decrypt'
        },
        files: [{
          expand:true,
          cwd:'encrypt/',
          src:['**/*'],
          dest:'decrypt/'
        }]
      }
    }
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('decrypt', ['cipher:decrypt']);
  grunt.registerTask('default', ['jshint','cipher:encrypt']);
};
