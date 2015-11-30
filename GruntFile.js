module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
      combine: {
        files: {
          'css/style.min.css': ['css/reset.css', 'css/style.css']
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'scripts/scripts.min.js': [ 'js/lib.js', 'js/googleMap.js', 'js/js.js']
        }
      }
    }

  });

  //load plugins
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Do the task
  grunt.registerTask('default', ['cssmin', 'uglify']);
};