/**
 * Created by hubert on 6/06/17.
 */
const gulp = require ('gulp');
const replace = require('gulp-replace');
const clean = require('gulp-clean');
const url = require('url');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback');
const proxy = require('proxy-middleware');
const ts = require('gulp-typescript');
const merge = require('merge2');
const flatten = require('gulp-flatten');

/**
 * compile project's typeScript code
 */
gulp.task('ts', function(){
    const tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts
            .pipe(flatten())
            .pipe(gulp.dest('src')),
        tsResult.js.pipe(gulp.dest('src'))
    ]);
});

/**
 * build task
 * Generate a bower ready package. in dist directory
 **/
gulp.task('build', function() {
    return gulp.src(['./src/**/*'] )
        .pipe(replace(/bower_components/g, '..'))
        .pipe(gulp.dest('./dist'));
});

/**
 * Clean build directory
 */
gulp.task('clean', function() {
    return gulp.src(['./dist'] )
        .pipe(clean());
});



const ozoneConfig = require('./conf.dev.json').ozoneApi;
const ozoneServer = ozoneConfig.hostProxy;
//const ozoneEndpoint = ozoneConfig.endpoint;
const proxyOptions = url.parse(ozoneServer);
proxyOptions.route = ozoneConfig.host;
proxyOptions.cookieRewrite = true;
// Watch files for changes & reload
gulp.task('serve', function() {

    console.log(proxyOptions);
    console.log('proxying requests to', ozoneServer);
    browserSync({
        port: 5000,
        notify: false,
        logPrefix: 'PSK',
        snippetOptions: {
            rule: {
                match: '<span id="browser-sync-binding"></span>',
                fn: function(snippet) {
                    return snippet;
                }
            }
        },
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            baseDir: ['.tmp', './'],
            middleware: [historyApiFallback(), proxy(proxyOptions)]
        }
    });

    gulp.watch(['src/**/*.html', '!app/bower_components/**/*.html'], reload);
    gulp.watch(['src/**/*.js'], reload);
});


// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
require('web-component-tester').gulp.init(gulp);