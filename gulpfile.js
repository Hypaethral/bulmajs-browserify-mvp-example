let gulp = require("gulp");
let browserify = require("browserify");
let babelify = require("babelify");
let source = require("vinyl-source-stream");
let buffer = require("vinyl-buffer");
let sourcemaps = require("gulp-sourcemaps");
let uglify = require("gulp-uglify");
let rename = require("gulp-rename");

gulp.task('default', function(done) {
    browserify('./src/js/index.js', { debug: true })
        .transform(babelify, {
            global: true,
            ignore: [/\/node_modules\/(?!@vizuaalog\/)/],
            presets: ["@babel/preset-env"]
        })
        .bundle()
        .pipe(source('index.js')) // Readable Stream -> Stream Of Vinyl Files
        .pipe(buffer()) // Vinyl Files -> Buffered Vinyl Files
        .pipe(sourcemaps.init().on('error', function(e) {
            console.log(e);
        }))
        .pipe(uglify().on('error', function(e) {
            console.log('here')
            console.log(e);
        }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./prod/js'));
})