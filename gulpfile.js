const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp
        .src(['src/**.js'])
        .pipe(babel({
            presets: ['es2015', 'stage-2'],
            plugins : [
                'check-es2015-constants',
                'transform-remove-console',
                'transform-minify-booleans',
                'transform-property-literals',
                'transform-member-expression-literals',
            ]
        }))
        .pipe(gulp.dest(''));
});
