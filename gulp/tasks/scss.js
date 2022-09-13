import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css"; // Cжатие css файла
import webpcss from "gulp-webpcss"; //Вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer"; // Добавление вендорных преффиксов( для кроссбраузерности)
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Группировка Медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemap: true })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(
        sass({
          outputStyle: "expanded",
        })
      )
      .pipe(app.plugins.replace(/@img\//g, "/src/img/"))
      .pipe(groupCssMediaQueries())
      .pipe(
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
      .pipe(
        autoprefixer({
          grid: "autoplace",
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
      //Раскомментировать если нужен не сжатый дубль файла стилей(строчка 39)
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(cleanCss())
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream())
  );
};
