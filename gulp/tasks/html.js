import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumper from "gulp-version-number";
import pug from "gulp-pug";

export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(
        pug({
          // Сжатие HTML файлов
          pretty: true,
          // Показывать в терминале какой файл обратан
          verbose: true,
        })
      )
      //Tолько для чистого HTML,для pug не нужно   .pipe(fileinclude())
      .pipe(app.plugins.replace(/@img\//g, "/src/img/"))
      .pipe(webpHtmlNosvg())
      .pipe(
        versionNumper({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
  );
};
