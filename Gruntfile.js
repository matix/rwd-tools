/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    concat: {
      options: {
        stripBanners: true
      },
      "source": {
        options: {
          separator: ";;"
        },
        src: ['js/impress.js',
              'js/impress.preprocess.js',
              'node_modules/codemirror/lib/codemirror.js',
              'node_modules/codemirror/mode/xml/xml.js',
              'node_modules/codemirror/mode/css/css.js',
              'node_modules/codemirror/mode/javascript/javascript.js',
              'node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
              'js/codemirror.bootstrap.js'
              ],
        dest: 'js/bundle.js'
      },
      "styles": {
        src: [
          'styles/main.css',
          'node_modules/codemirror/lib/codemirror.css',
          'node_modules/codemirror/theme/neat.css'
        ],
        dest: "styles/bundle.css"
      }
    },
    less:{
      "styles":{
        paths:["styles/"],
        files: {
          "styles/main.css":"styles/main.less"
        }
      }
    },
    uglify: {
      "source": {
        src: '<%= concat.source.dest %>',
        dest: 'js/bundle.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      "gruntfile": {
        src: 'Gruntfile.js'
      }
    },
    watch: {
      "gruntfile": {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      "concat": {
        files: '<%= concat.source.src %>',
        tasks: ['concat:source']
      },
      "less": {
        files: 'styles/**.less',
        tasks: ['less:styles', "concat:styles"]
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.'
        }
      }
    },
    concurrent: {
      'dev-run': {
        options: {
          grunt:true,
          logConcurrentOutput: true
        },
        tasks: ['watch', 'connect:server:keepalive']
      }
    },
    publish: {
      "gh-pages": {
        dest: "gh-pages",
        src: [
          "images/*.*",
          "styles/font-awesome/font/**.*",
          "styles/font-awesome/css/font-awesome.css",
          "styles/bundle.css",
          "js/bundle.js",
          "demos/**/**.*",
          "index.html",
          "README.md"
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');

  // Publish distrubution files
  grunt.registerMultiTask("publish", function () {
      this.files.forEach(function (file) {

        file.src.forEach(function (srcfile) {
          grunt.file.copy(srcfile, file.dest + "/" + srcfile);
        });

      });
  });

  // Default task.
  grunt.registerTask('build', ['jshint', 'less', 'concat']);
  grunt.registerTask('run', ['build', "connect:server:keepalive"]);
  grunt.registerTask('dev-run', ["concurrent:dev-run"]);
  grunt.registerTask('default', ['build']);

};
