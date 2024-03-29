const gulp = require("gulp");
const { series } = gulp;
const gulpClean = require("gulp-clean");
const gulpSass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const gulpBase64 = require("gulp-base64-inline");
const gulpPug = require("gulp-pug");
const gulpUglify = require("gulp-uglify");
const BrowserSync = require("browser-sync");
const browserSync = BrowserSync.create();

const isProduction = process.env.NODE_ENV === "production";

var path = {
  dist: {
    html: "dist/",
    js: "dist/js/",
    css: "dist/css/",
    img: "dist/img/",
    fonts: "dist/fonts/",
  },
  src: {
    html: ["src/**/*.pug"],
    js: "src/js/*.js",
    style: "src/sass/main.sass",
    cssEntry: "dist/css/main.css",
    img: "src/img/**/*.*",
    imgRelative: "../../src/img/",
    fonts: "src/fonts/**/*.*",
  },
  watch: {
    html: "src/**/*.pug",
    js: "src/js/**/*.js",
    style: "src/sass/**/*.sass",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
  },
  clean: "./dist",
};

const serverConfig = {
  server: {
    baseDir: "./dist",
  },
  tunnel: false,
  host: "localhost",
  port: 63341,
  logPrefix: "browser-sync",
};

// CLEAN
function clean() {
  return gulp.src(path.dist.html, { allowEmpty: true }).pipe(gulpClean());
}

// SASS
function sass() {
  const outputStyle = isProduction ? "compressed" : "expanded";
  return gulp
    .src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(
      gulpSass
        .sync({
          soursemap: !isProduction,
          outputStyle,
        })
        .on("error", gulpSass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.css))
    .pipe(BrowserSync.stream());
}

// PUG
function pug() {
  return gulp
    .src(path.src.html)
    .pipe(
      gulpPug({
        pretty: !isProduction,
      })
    )
    .pipe(gulp.dest(path.dist.html))
}

// SCRIPTS
function scripts() {
  return gulp
    .src(path.src.js)
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
}

// IMAGES
function images() {
  return gulp
      .src(path.src.img)
      .pipe(gulp.dest(path.dist.img));
}

// ASSETS
function assets() {
  return gulp
    .src(path.src.cssEntry)
    .pipe(gulpBase64(path.src.imgRelative))
    .pipe(gulp.dest(path.dist.css));
}

// SERVER
function server() {
  browserSync.init(serverConfig);
}

// DEFAULT
const build = series(clean, sass, images, pug);

// WATCH
function watch() {
  server();
  build();
  gulp.watch("src/**/*").on('change', series(build, browserSync.reload));
}

exports.watch = watch;
exports.default = build;

