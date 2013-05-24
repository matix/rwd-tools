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
        src: ['js/**.*js'],
        dest: 'js/bundle.js'
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
      "dist": {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/bundle.min.js'
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
        tasks: ['less:styles']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('build', ['jshint', 'concat', "less"]);
  grunt.registerTask('default', ['build']);

};
