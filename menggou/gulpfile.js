var gulp = require("gulp");
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
gulp.task("html",function(){
  //stream 流  读取
  //app/**/*.html app下面所有子目录的所有html文件
  gulp.src("app/**/*.html")
  .pipe(gulp.dest("dist"))
  .pipe(connect.reload());
});

gulp.task("css",function(){
  //app的css压缩，放到dist里面
  gulp.src("app/css/**/*.css")
  .pipe(minifyCss())
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
});
gulp.task("libs",function(){
   gulp.src("app/libs/**/*")
  .pipe(gulp.dest("dist/libs"))
  .pipe(connect.reload());
});
gulp.task("js",function(){
  gulp.src("app/js/*.js")
  .pipe(babel({
            presets: ['@babel/env']
        }))
  .pipe(uglify())
  .pipe(gulp.dest("dist/js"))
  .pipe(connect.reload());
});
gulp.task("module",function(){
  gulp.src("app/module/*.js")
  .pipe(babel({
            presets: ['@babel/env']
        }))
  .pipe(uglify())
  .pipe(gulp.dest("dist/module"))
  .pipe(connect.reload());
});
gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 2333,
        root:"dist"
    });
});

gulp.task("watch",function(){
  gulp.watch("app/js/**/*.js",["js"]);
  gulp.watch("app/css/**/*.css",["css"]);
  gulp.watch("app/**/*.html",["html"]);
  gulp.watch("app/sass/**/*.scss",["sass"]);
  gulp.watch("app/img/**/*",["img"]);
  gulp.watch("app/module/**/*.js",["module"]);
  
	
});
gulp.task("img",function(){
  gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'))
});
gulp.task("sass",function(){
  gulp.src("app/sass/**/*.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})
  gulp.task("default",["html","js","css","webserver","watch","img","sass","libs","module"]);
