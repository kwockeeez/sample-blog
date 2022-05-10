const        gulp = require("gulp");
const         del = require("del");
const browserSync = require("browser-sync").create();
const        sass = require("gulp-sass")(require("sass"));


// Server
const server = () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
}


// Clear directory
const clear = done => {
    del.sync('./public');
    done();
}


// HTML
const html = () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
};


// SASS
const scss = () => {
    return gulp.src('./src/sass/*.{sass,scss}')
        .pipe(sass())
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
};


// Watching
const watch = () => {
    gulp.watch('./src/*.html', html);
    gulp.watch('./src/sass/**/*.{sass,scss}', scss);
}


exports.default = gulp.series(
    clear,
    gulp.parallel(html, scss),
    gulp.parallel(watch, server)
);