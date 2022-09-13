import replace from "gulp-replace"; // Поиск и замена
import plumber from "gulp-plumber"; // обработка ошибок
import notify from "gulp-notify"; //Cообщения(подсказки)
import browsersync from "browser-sync"; // Локальный сервер

// Экспортирование объектов
export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
};
