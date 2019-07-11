/**
 * Created by Tivie on 12-11-2014.
 */

module.exports = function (grunt) {
  'use strict'

  //load Package configuration
  var pkg = grunt.file.readJSON('package.json'),

    // load pkg hst
    hst = grunt.file.readJSON('.hst.json'),

    // Project configuration.
    config = {
      pkg: pkg,

      // File concatenation
      concat: {
        options: {
          sourceMap: true,
          banner: ';/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n(function(){\n',
          footer: '}).call(this);'
        },
        dist: {
          src:  [
            'src/**/*.js'
          ],
          dest: 'dist/<%= pkg.name %>.js'
        }
      },

      eslint: {
        options: {
          configFile: '.eslintrc.json'
        },
        target: [
          'Gruntfile.js',
          'src/**/*.js',
          'test/**/*.js'
        ]
      },

      // File minification
      uglify: {
        options: {
          sourceMap: true,
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
          files: {
            'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
          }
        }
      },

      // Create changelog based on git commits
      conventionalChangelog: {
        options: {
          changelogOpts: {},
        },
        release: {
          src: 'CHANGELOG.md'
        }
      },

      /**
     * EXTRA
     *
     * The following tasks are used to prepare and configure the boilerplate with your values automatically
     * You can remove them safely if you don't need them anymore
     */
      // This task ensures data in bower.json and component.json is always in sync with package.json
      update_json: {
        options: {
          src: 'package.json',
          indent: '  '
        },
        bower: {
          dest: 'bower.json',
          fields: [
            'name',
            'version',
            'description',
            'author',
            'keywords',
            'license',
            'repository',
            'main',
            'dependencies'
          ]
        },
        component: {
          dest: 'component.json',
          fields: [
            'name',
            {
              repository: function(src) {
                return src.repository.url.match(/([^\/]+\/[^\/]+).git/)[1]
              }
            },
            'description',
            'version',
            'keywords',
            {
              scripts: function(src) {
                return [src.main]
              }
            },
            'license'
          ]
        }
      },

      // This task renames the main library file in src directory matches the one you supplied in package.json
      rename: {
        mainFile: {
          src: 'src/' + hst.src + '.js',
          dest: 'src/' + pkg.name + '.js'
        },
        testFile: {
          src: 'test/' + hst.src + '.js',
          dest: 'src/' + pkg.name + '.js'
        }
      }

    }

  // Load config
  grunt.initConfig(config)

  // load all grunt tasks
  require('load-grunt-tasks')(grunt)

  // Alias tasks
  grunt.registerTask('lint', ['eslint'])
  grunt.registerTask('build', ['lint', 'concat', 'uglify'])
  grunt.registerTask('prep-release', ['build', 'changelog'])

  // Default task(s).
  // grunt.registerTask('default', ['test'])

}
