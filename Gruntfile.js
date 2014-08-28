'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    svg2string: {
      icons: {
        options: {
          symbols: 'icon'
        },
        files: {
          'assets/_/icons.js': 'assets/images/icons/*.svg'
        }
      }
    },

    less: {
      all: {
        files: {
          'assets/_/slides.css': 'assets/less/slides.less'
        }
      }
    },

    autoprefixer: {
      all: {
        files: {
          'assets/_/slides.css': 'assets/_/slides.css'
        }
      }
    },

    connect: {
      server: {
        options: {
          livereload: false,
          base: [''],
          hostname: '*',
          port: 8201
        }
      }
    },

    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      icons: {
        files: ['assets/images/icons/*.svg'],
        tasks: ['svg2string']
      },
      styles: {
        files: ['assets/less/*.less'],
        tasks: ['less', 'autoprefixer']
      }
    }

  });


  grunt.loadNpmTasks('grunt-svg2string');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['svg2string', 'less', 'autoprefixer']);
  grunt.registerTask('server', ['connect', 'watch']);

};
