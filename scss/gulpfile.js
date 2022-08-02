const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('cssnano');
function css() {
    return gulp
        .src("scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename(function (path) {
            path.basename = "style";
            path.extname = ".min.css";
        }))
        .pipe(autoprefixer({
            browsers: [
                'last 4 versions',
            ]
        }))
        .pipe(gulp.dest("app/css"))
}

// function scripts() {
//     return gulp.src(devDir + "/js/*.js")
//         .pipe(uglify())
//         .pipe(rename(function (path) {
//             path.extname = ".min.js";
//         }))
//         .pipe(gulp.dest(assetsDir + "/js"));
// }
function watch() {
    browserSync.init({
        server: {
            baseDir: "app/",
            directory: true
        }
    });
    css();
    // scripts();
    gulp.watch('scss/**/*.scss', css ).on('change', browserSync.reload);
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
}

gulp.task("watch", watch);
gulp.task("default", watch);