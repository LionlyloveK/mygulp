/*
 * @Verison: gulp 4.0
 * @Author: coderLi <hyonlylovek@gmail.com>
 * @Date: 2020-03-10 10:46:16 
 * @Last Modified by: coderLi <hyonlylovek@gmail.com>
 * @Last Modified time: 2020-08-27 17:23:02
 */
var gulp = require('gulp');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var fileinclude = require('gulp-file-include');
// var sass = require('gulp-sass');
const sass = require('gulp-sass')(require('sass'))
// const postcss = require('gulp-postcss');
// const scss = require('postcss-scss');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-javascript-obfuscator'); //开启混淆
var sourcemaps = require('gulp-sourcemaps'); // 4.0 内置sourcemaps
// gulp.src(paths.scripts.src, { sourcemaps: true })
var cache = require('gulp-cache');
//html压缩
var htmlmin = require('gulp-htmlmin');
//报错-不退出任务
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
//删除
var clean = require('gulp-clean');
//css前缀
var autoprefixer = require('gulp-autoprefixer');
//压缩css
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var zip = require('gulp-zip');
const os = require('os');
//开启浏览器热刷新
gulp.task('server', function () {
    const interfaces = os.networkInterfaces();
    let localIP;

    // 寻找非回环地址的IPv4地址
    for (const key in interfaces) {
        for (const iface of interfaces[key]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                localIP = iface.address;
                break;
            }
        }
        if (localIP) {
            break;
        }
    }

    connect.server({
        root: 'dist',
        port: 10086,
        livereload: true,
        host: localIP
    });
});

//合并文件
function includeFile() {
    return gulp.src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))

        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
}


//sass/scss编译
gulp.task('sass', function () {
    return gulp.src('src/css/**/*.{scss,sass}')
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8",
                'last 2 versions',
            ]
        }))
        .pipe(sass())
        // .pipe(postcss([scss])) // 使用 postcss-scss 解析器
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

//拷贝css
gulp.task('copy-css', function () {
    return gulp.src('src/css/*.min.css') //非scss后缀 匹配?
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

//压缩js
function zipjs() {
    return gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify({ mangle: { toplevel: true } }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
}

//拷贝js
gulp.task('copy-js', function () {
    return gulp.src('src/js/**/*.min.js')
        // .pipe(obfuscate({
        //   stringArrayEncoding: true
        // }))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

//图片复制
// .pipe(imagemin({
//     optimizationLevel: 5 //类型：Number  默认：3  取值范围：0-7（优化等级）
// }))
gulp.task("copy-img", function () {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());
});
gulp.task('images', function () {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching img that ran through imagemin
        .pipe(cache(imagemin({ //压缩图片文件
            optimizationLevel: 5, // 取值范围：0-7（优化等级），默认：3  
        })))
        .pipe(gulp.dest('dist/img'))
});

//组合监听任务
gulp.task('watch', function () {
    gulp.watch('src/css/*.scss', gulp.series('sass', 'copy-css'));
    // gulp.watch('src/css/*.css', gulp.series(gulp.parallel('copy-css', 'copy-js')));
    gulp.watch('src/public/*.html', gulp.series('includeFile'));
    gulp.watch('src/*.html', gulp.series('includeFile', 'copy-css', 'copy-js'));
    // gulp.watch('src/js/*.js', gulp.series('zipjs', 'copy-js'));
    gulp.watch('src/img/*.*', gulp.series('copy-img'));
});

gulp.task('default', gulp.series(gulp.parallel('watch', 'server', function () {
    console.log('Gulp任务执行成功,开始撸代码!');
})));


//执行删除dist文件夹
function delDist() {
    del('dist/');
}

function build() {
    var project = process.cwd().split('\\');
    // TODO: 时间戳哈希值, 混淆(del sourcemap文件)
    return gulp.src('dist/**/*')
        .pipe(zip(project[project.length - 1] + '.zip'))
        .pipe(gulp.dest('./'));
}

exports.build = build;
exports.delDist = delDist;
// exports.zipjs = zipjs;
exports.includeFile = includeFile;

// gulp.task(zipjs);
gulp.task(delDist);
gulp.task(build);
gulp.task(includeFile);