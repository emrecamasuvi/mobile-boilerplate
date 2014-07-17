/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  // Displays the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  var JSfiles = [
          'src/components/jquery/dist/jquery.min.js',
          'src/components/modernizr/modernizr.js',
          'src/components/underscore/underscore.js',
          'src/js/**/*.js'
    ];

  // Project configuration.
  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 1903,
          hostname: '*',
          base: 'dist',
          livereload: true,
          open: true
        }
      }
    },

    clean: ['dist'],

    watch: {
      files: ['<%= jshint.files %>', 'src/scss/**/*.scss', 'src/*.html'],
      tasks: 'onChange',
      options: {
        livereload: true
      }
    },

    notify: {
      watch: {
        options: {
          message: 'Changes loaded!',
        }
      },
      server: {
        options: {
          message: 'Server is ready!'
        }
      }
    },

    jshint: {
      files: [
        'src/js/**/*.js', 'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    concat: {
      basic: {
        src: JSfiles,
        dest: 'dist/index.min.js',
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          require: ['./url64.rb']
        },
        expand: true,
        cwd: 'src/',
        src: ['scss/**/*.scss'],
        dest: 'dist/css/',
        flatten: true,
        ext: '.css'
      },
      dev: {
        options: {
          style: 'compact',
          debugInfo: true,
          lineNumbers: true,
          require: ['./url64.rb']
        },
        expand: true,
        cwd: 'src/',
        src: ['scss/*.scss'],
        dest: 'dist/css/',
        flatten: true,
        ext: '.css'
      }
    },

    autoprefixer: {
      single_file: {
        src: 'dist/main.min.css'
      },
    },

    cssmin: {
      index: {
        files: {
          'dist/css/main.min.css': [
            'dist/css/main.min.css'
          ]
        }
      }
    },

    uglify: {
      index: {
        src: [
          JSfiles
        ],
        dest: 'dist/index.min.js'
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: '*.html',
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      },
      images: {
        expand: true,
        cwd: 'src/',
        src: 'img/**/*',
        dest: 'dist/',
      },
      fonts: {
        expand: true,
        cwd: 'src/',
        src: 'components/fontawesome/fonts/**/*',
        dest: 'dist/fonts/',
        flatten: true
      }
    },

    imagemin: {                          // Task
      // static: {                          // Target
      //   options: {                       // Target options
      //     optimizationLevel: 3,
      //     use: [mozjpeg()]
      //   },
      //   files: {                         // Dictionary of files
      //     'dist/img.png': 'src/img.png', // 'destination': 'source'
      //     'dist/img.jpg': 'src/img.jpg',
      //     'dist/img.gif': 'src/img.gif'
      //   }
      // },
      // dynamic: {                         // Another target
      //   files: [{
      //     expand: true,                  // Enable dynamic expansion
      //     cwd: 'src/',                   // Src matches are relative to this path
      //     src: ['img/**/*.{png,jpg,gif}'],   // Actual patterns to match
      //     dest: 'dist/'                  // Destination path prefix
      //   }]
      // },
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.png', '!components/**/*.png'],
            dest: 'dist/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.jpg', '!components/**/*.jpg'],
            dest: 'dist/',
            ext: '.jpg'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeEmptyAttributes: true,
          removeCommentsFromCDATA: true,
          removeRedundantAttributes: true,
          collapseBooleanAttributes: true
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.html', '!components/**/*.html'],
            dest: 'dist/',
            ext: '.html'
          }
        ]
      },
    }

  });

  // Default task.
  grunt.registerTask('minify', ['jshint', 'uglify', 'cssmin', 'copy', 'imagemin', 'htmlmin']);
  grunt.registerTask('onChange', ['newer:jshint', 'newer:sass:dev', 'newer:autoprefixer:single_file', 'concat', 'newer:copy', 'notify:watch']);
  grunt.registerTask('build', ['clean', 'jshint', 'sass:dist', 'htmlmin', 'imagemin', 'concat', 'copy']);
  grunt.registerTask('server', ['clean', 'connect', 'onChange', 'copy', 'watch']);
  grunt.registerTask('default', ['jshint', 'sass:dev']);

};
