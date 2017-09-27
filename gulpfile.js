// ------------------------------------------------------------------
// Imports
// ------------------------------------------------------------------
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    queue       = require('run-sequence');

var babel = require('gulp-babel'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    del = require('del');

// ------------------------------------------------------------------
// Gulp Settings
// ------------------------------------------------------------------
var config = {
    basePath: './',
    baseSrcPath: './src/',
    baseBuildPath: './dist/',
    baseAssetPath: './assets/'

};

// ------------------------------------------------------------------
// Gulp Main Tasks
// ------------------------------------------------------------------
gulp.task('build', function(callback) {

    log('%t1%');

    log('%s50%', 'bggreen');
    log('%s19%Build Assets%s19%', ['bggreen','black']);
    log('%s50%', 'bggreen');

    log('%t1%');

    queue('base:styles',
        'base:scripts',
        callback
    );

});

// ------------------------------------------------------------------
// Gulp Subtasks
// ------------------------------------------------------------------

gulp.task('base:styles', function(){

    var files = [
        config.baseSrcPath + 'scss/app.scss'
    ];

    return gulp.src(files)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.baseBuildPath + 'css'));
});

gulp.task('base:scripts', ['commonjs-bundle']);

gulp.task('clean-temp', function(){
    return del(['dist/tmp']);
});

gulp.task('es6-commonjs',['clean-temp'], function(){
    return gulp.src(['src/js/*.js','src/js/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist/tmp'));
});

gulp.task('bundle-commonjs-clean', function(){
    return del([config.baseBuildPath + 'js']);
});

gulp.task('commonjs-bundle',['bundle-commonjs-clean','es6-commonjs'], function(){
    return browserify(['dist/tmp/app.js'])
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('src/js/app.js'))
        .pipe(buffer())
        .pipe(rename('app.js'))
        .pipe(gulp.dest(config.baseBuildPath + 'js'));
});

// ------------------------------------------------------------------
// Utilities
// ------------------------------------------------------------------

/* Log on terminal adding styles
 *
 * Usage:
 * - %tx: x is the number of tabs to be added
 * - %sx: x is the number of spaces to be added
 */
function log (text, style) {

    var replacer = "";

    // Processes tabs tags
    var tabRegex = /\%t\d+\%/g;
    if (text.match(tabRegex)) {
        while((result = tabRegex.exec(text)) !== null) {
            // Extract number of time to repeat
            var tabCounter = result[0].replace(/(\%t|\%)/g,  '');

            // Build new string
            replacer = "";
            for (var i = 0; i < parseInt(tabCounter); i++) {
                replacer += "\n\r";
            }

            // Return
            text = text.replace(result[0], replacer);
        }
    }

    // Processes spaces tags
    var spaceRegex = /\%s\d+\%/g;
    if (text.match(spaceRegex)) {
        while((result = spaceRegex.exec(text)) !== null) {
            // Extract number of time to repeat
            var spaceCounter = result[0].replace(/(\%s|\%)/g,  '');

            // Build new string
            replacer = "";
            for (var i = 0; i <  parseInt(spaceCounter); i++) {
                replacer += " ";
            }

            // Return
            text = text.replace(result[0], replacer);
        }
    }

    // Writes on terminal
    if (typeof style === 'undefined' || style === false) {
        console.log(text);
    } else {
        console.log(styler(style), text);
    }

}


/* Simplify method to apply styles on terminal command */
function styler(modifiers) {

    var result = "";
    var styles = {
        "bright"     : "\x1b[1m",
        "dim"        : "\x1b[2m",
        "underscore" : "\x1b[4m",
        "blink"      : "\x1b[5m",
        "hidden"     : "\x1b[8m",

        "black"      : "\x1b[30m",
        "red"        : "\x1b[31m",
        "green"      : "\x1b[32m",
        "yellow"     : "\x1b[33m",
        "blue"       : "\x1b[34m",
        "magenta"    : "\x1b[35m",
        "cyan"       : "\x1b[36m",
        "white"      : "\x1b[37m",

        "bgblack"    : "\x1b[40m",
        "bgred"      : "\x1b[41m",
        "bggreen"    : "\x1b[42m",
        "bgyellow"   : "\x1b[43m",
        "bgblue"     : "\x1b[44m",
        "bgmagenta"  : "\x1b[45m",
        "bgcyan"     : "\x1b[46m",
        "bgwhite"    : "\x1b[47m",
    };

    if (modifiers.constructor === Array) {
        for (var i = 0; i <  modifiers.length; i++) {
            result += styles[modifiers[i]];
        }
    } else {
        result = styles[modifiers];
    }

    return result + "%s\x1b[0m";

}