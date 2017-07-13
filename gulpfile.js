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
const runSequence = require('run-sequence');

/**
 * gulp ts
 * compile project's typeScript code
 */
gulp.task('ts', function(){
    const tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts
            .pipe(gulp.dest('elements')),
        tsResult.js
            .pipe(gulp.dest('elements'))
    ]);
});

/**
 * gulp ts:watch
 * Rerun ts task when a ts file changes
 */
gulp.task('ts:watch', function() {
    gulp.watch(['elements/**/*.ts','!elements/**/*.d.ts'], ['ts']);
});

/**
 * gulp dist
 * Generate a bower ready package in dist directory
 **/
gulp.task('dist', function() {
    return gulp.src(['./elements/**/*'] )
        .pipe(replace(/bower_components/g, '..'))
        .pipe(gulp.dest('./dist'));
});

/**
 * gulp clean
 * Clean build directory
 */
gulp.task('clean', function() {
    return gulp.src(['./build', './dist'] )
        .pipe(clean());
});



const ozoneConfig = require('./conf.ozone.json').ozoneApi;
const ozoneServer = ozoneConfig.hostProxy;
//const ozoneEndpoint = ozoneConfig.endpoint;
const proxyOptions = url.parse(ozoneServer);
proxyOptions.route = ozoneConfig.host;
proxyOptions.cookieRewrite = true;
// Watch files for changes & reload

/**
 * gulp serve
 * Run demo application localy
 * with a proxy to ozone api
 *
 */
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
            baseDir: ['./'],
            middleware: [historyApiFallback(), proxy(proxyOptions), function(req,res,next){
                if (req.url === '/index.html') {
                    console.log('redirect to demo.html');
                    req.url = '/demo.html';
                }
                return next();
            }],
            index: "/demo.html"
        }
    });

    gulp.watch(['elements/**/*.html', '!app/bower_components/**/*.html'], reload);
    gulp.watch(['elements/**/*.js'], reload);
});


/**
 * gulp test:browserstack
 * Runs WCT on BrowserStack. Requires two environment variables:
 * BROWSERSTACK_KEY and BROWSERSTACK_USER.
 */
gulp.task('test:browserstack', function(cb) {
    var user = process.env.BROWSERSTACK_USER;
    var key = process.env.BROWSERSTACK_KEY;
    if (!user || !key) {
        throw new Error('Missing BrowserStack credentials. Did you forget to set BROWSERSTACK_USER and/or BROWSERSTACK_KEY?');
    }
    runSequence(
        'starttunnel',

        // "wct:sauce" is currently the name of the task that WCT uses to start tests.
        // The name does not imply a requirement of SauceLabs.
        'wct:sauce',

        'stoptunnel',
        cb);
});


var browserStack = require('gulp-browserstack');
// Starts BrowserStack tunnel
gulp.task('starttunnel', function() {
    return throughObjToPromise(browserStack.startTunnel({
        key: process.env.BROWSERSTACK_KEY,'force': 'true'
    }));
});

// Stops BrowserStack tunnel
gulp.task('stoptunnel', function() {
    return throughObjToPromise(browserStack.stopTunnel());
});
function throughObjToPromise(obj) {
    var p = new Promise(function(resolve, reject) {
        var fn = obj._transform;
        fn('', '', function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    return p;
}

/**
 * gulp test
 * Alias for wct
 * Load tasks for web-component-tester
 * Adds tasks for `gulp test:local` and `gulp test:remote`
 */
require('web-component-tester').gulp.init(gulp);


/**
 * gulp build:conf
 * copy config file in build directory
 */
gulp.task('build:conf', function() {
    return gulp.src(['conf.ozone.json'] )
        .pipe(gulp.dest('./build'));
});

const PolymerProject = require('polymer-build').PolymerProject;
const mergeStream = require('merge-stream');

/**
 * gulp build
 * vulcanize application to build directory.
 */
gulp.task('build', ['build:conf'],  function() {
    const project = new PolymerProject(require('./polymer.json'));
    mergeStream(project.sources(), project.dependencies())
        .pipe(project.bundler())
        .pipe(gulp.dest('build/'));
});

