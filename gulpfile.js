const gulp = require("gulp");
// const mergeStream = require("merge-stream");
// var sourcemaps = require("gulp-sourcemaps");
// const ts = require("gulp-typescript");
// const exec = require("child_process").exec;
// //https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
const { exec } = require("child_process");
const path = require("path");
gulp.task("build:system", function (cb) {
    const buildCommand = exec("npm run build:system");
    buildCommand.on("close", function (code) {
        console.log("npm run build:system exited with code " + code);
        cb(code);
    });
});

gulp.task("copy-resources", function () {
    return gulp.src("./package.json").pipe(gulp.dest("dist/"));
});

gulp.task("default:build", gulp.series("build:system", "copy-resources"));

// let env;
// switch (process.env.NODE_ENV) {
//     case "development":
//         env = "dev";
//         break;
//     case "production":
//         env = "prod";
//         break;
//     case "local":
//         env = "local";
//         break;
//     default:
//         env = "development";
// }

// gulp.task("watch:client", function () {
//     gulp.watch("app/*", { events: "all" });
// });

// gulp.task("watch:server", function () {
//     return gulp.watch("server/*", { events: "all" }, function (cb) {
//         cb();
//     });
// });

// gulp.task("watch", function (cb) {});

// //

// // gulp.task("build-sup", function () {
// //   return gulp
// //     .src("./sup/src/index.js")
// //     .pipe(gulpWebpack(webpackConfigFileSup, webpack))
// //     .pipe(gulp.dest("dist/sup"));
// // });

// // gulp.task("build-server", function () {
// //   const tsProject = ts.createProject("./server/tsconfig.json");
// //   return gulp
// //     .src("./server/src/**/*.ts")
// //     .pipe(sourcemaps.init())
// //     .pipe(tsProject())
// //     .pipe(sourcemaps.write())
// //     .pipe(gulp.dest("dist/server"));
// // });

// // gulp.task("copy-resources", function () {
// //   return mergeStream([
// //     gulp.src("./server/tsconfig.json").pipe(gulp.dest("dist/server")),
// //     gulp.src("./package.json").pipe(gulp.dest("dist/")),
// //   ]);
// // });

// // gulp.task(
// //   "default",
// //   gulp.parallel("build-client", "build-server", "copy-resources")
// // );
