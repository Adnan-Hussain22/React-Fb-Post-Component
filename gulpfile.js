const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('compile-sass',()=>{
    // from where to get the files
    return gulp.src(['./src/Components/Scss/*.scss'])
    .pipe(sass()) // pipe to compile the sass
    .pipe(gulp.dest('./src/Components/Css/')) // move it in the destination file
});

gulp.task('compile-sass',function(){
    gulp.watch(['compile-sass'])
})

//this will trigger all the tasks
gulp.task('default',['compile-sass']);