module.exports = function( grunt )
{
    grunt.initConfig(
    {
        bower:
        {
            dev:
            {
                dest: 'lib/'
            }
        },

        browserify:
        {
            dev:
            {
                files:{
                    'www/scripts/game.js': ['.tmp/babel/scripts/scripts/**/**/**.js']
                }
            }
        },

        babel:{
            options:{
                sourceMap:true,
                "plugins": ["transform-es2015-arrow-functions"]
            },
            dev:{
                files:[{
                    expand:true,
                    cwd:'client/scripts/',
                    src:['**/**.js'],
                    dest:'.tmp/babel/scripts/scripts/',
                    ext:'.js'
                }]
            }
        },

        concat:{
            options: {
                separator: ';',
            },
            template:{
                src:['client/templates/*.html'],
                dest:'www/templates/template.html',
                options: {
                    separator: '\n\n'
                }
            },
            css:{
                src:['client/styles/*.css'],
                dest:'www/styles/styles.css',
                options: {
                    separator: '\n\n'
                }
            },
            dev:{
                 src:['lib/**/*.js'],
                 dest:'www/scripts/libs.js'
            },
        },

        copy:
        {
            dev:{
                files:{
                    'www/index.html':'client/index.html',
                    'www/':'images/**/**/**'
                }
            }
        },

        express:
        {
            options: {
              // Override defaults here
            },
            dev: {
              options: {
                script: 'server/server.js'
              }
            }
        },

        watch:
        {
            scripts:
            {
                files: ['client/scripts/**/**.js'],
                tasks: [ 'build','express','cacheBust'],
                options:
                {
                    spawn:false,
                    livereload: true
                }
            },

            template:
            {
                files: ['client/templates/**.html'],
                tasks: [ 'concat:template'],
                options:
                {
                    livereload: true
                }
            },

            html:
            {
                files: ['client/**.html'],
                tasks: [ 'copy'],
                options:
                {
                    livereload: true
                }
            },

            css:
            {
                files: ['client/styles/**.css'],
                tasks: [ 'build','express','cacheBust'],
                options:
                {
                    spawn:false,
                    livereload: true
                }
            },

            server:
            {
                files: ['server/**/**.js'],
                tasks: [ 'server'],
                options:
                {
                    spawn:false,
                    livereload: true
                }
            }
        },

        clean:{
            dev:{
                src:['www','.tmp']
            }
        },

        uglify: {
            scripts:
            {
                files:
                {
                    'www/scripts/libs.js': [ 'lib/**/**.js' ],
                    'www/scripts/game.js': [ 'www/scripts/game.js' ]
                }
            }
        },

        cacheBust: {
            options: {
              encoding: 'utf8',
              algorithm: 'md5',
              length: 16,
              jsonOutput: true,
              deleteOriginals: false,
              jsonOutputFilename: 'www/scripts/grunt-cache-bust.json',
              assets: ['www/scripts/game.js','www/scripts/libs.js', 'www/styles/styles.css'],
            },
            assets: {
                files: [{
                    src: []
                }]
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-cache-bust');
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-bower' );
    grunt.loadNpmTasks( 'grunt-browserify' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-express-server' );
    grunt.loadNpmTasks( 'grunt-execute' );

    grunt.registerTask( 'build', [ 'clean:dev','bower','babel:dev','browserify:dev','concat','copy' /*, 'cacheBust'*/] );
    grunt.registerTask( 'build:production', [ 'clean:dev','bower','babel:dev','browserify:dev','concat:template','concat:css','uglify','copy','cacheBust'] );

    grunt.registerTask( 'server', [ 'express' ] );
    grunt.registerTask( 'serve', [ 'build','server','watch' ] );
    grunt.registerTask( 'serve:production', [ 'build:production','express','watch' ] );
}
