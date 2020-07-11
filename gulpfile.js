const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require("./gulp.config")

sass.compiler = require('node-sass');

task( 'clean', () => {
    return src( `${DIST_PATH}/**/*`, { read: false })
      .pipe( rm() )
});

task ("copy:html", ()=> {
    return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});

const pics = [
    `${SRC_PATH}/img/pics/*.png`,
    `${SRC_PATH}/img/pics/*.jpg`
];
task ("copy:pics", ()=> {
    return src(pics)
    .pipe(dest(`${DIST_PATH}/img/pics`))
    .pipe(reload({stream: true}));
});

task ("copy:video", ()=> {
    return src(`${SRC_PATH}/video/*.mp4`)
    .pipe(dest(`${DIST_PATH}/video`))
    .pipe(reload({stream: true}));
});


const slick = [
    `${SRC_PATH}/libs/slick/slick.css`,
    `${SRC_PATH}/libs/slick/slick.min.js`
]
task ("copy:slick", ()=> {
    return src(slick)
    .pipe(dest(`${DIST_PATH}/libs/slick`))
    .pipe(reload({stream: true}));
});

const fancy = [
    `${SRC_PATH}/libs/fancybox-master/dist/jquery.fancybox.min.css`,
    `${SRC_PATH}/libs/fancybox-master/dist/jquery.fancybox.min.js`
]
task ("copy:fancy", ()=> {
    return src(fancy)
    .pipe(dest(`${DIST_PATH}/libs/fancybox`))
    .pipe(reload({stream: true}));
});

task ("styles", ()=> {
    return src([...STYLES_LIBS, `${SRC_PATH}/styles/main.scss`])
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env == "dev",
    autoprefixer({cascade: false})
    ))
    .pipe(gulpif(env == "prod", gcmq()))
    .pipe(gulpif(env == "prod", cleanCSS()))
    .pipe(gulpif(env == "dev", sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/styles`))
    .pipe(reload({stream: true}));
});

task('scripts', () => {
    return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat("main.min.js", {newLine: ";"}))
    .pipe(gulpif(env == "prod",
        babel({
            presets: ['@babel/env']
         })
    ))
    .pipe(gulpif(env == "prod", uglify()))
    .pipe(sourcemaps.write())
    .pipe(dest(`${DIST_PATH}/js`))
    .pipe(reload({stream: true}));
})

task ("icons", () => {
    return src(`${SRC_PATH}/img/icons/*.svg`)
    .pipe(svgo({
        plugins: [
            {
                removeAttrs: {
                    attrs: "(fill|stroke|style|width|height|data.*)"
                }
            }
        ]
    })
    )
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: "../sprite.svg"
            }
        }
    }))
    .pipe(dest(`${DIST_PATH}/img/icons`))
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});


task("watch", () => {
    watch("./src/styles/**/*.scss", series('styles'));
    watch("./src/*.html", series('copy:html'));
    watch("./src/js/*.js", series('scripts'));
    watch("./src/images/icons/*.svg", series('icons'));
})

task("default",
    series("clean",
    parallel("copy:html", "styles", "scripts", "copy:slick", "copy:fancy", "icons", "copy:pics", "copy:video"), 
    parallel("watch", "server")
    )
);

task(
    "build",
    series("clean", parallel("copy:html", "styles", "scripts", "copy:slick", "copy:fancy", "icons", "copy:pics", "copy:video"))
);