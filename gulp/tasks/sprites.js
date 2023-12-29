/**
 * SVG спрайт
 *
 * Создает svg спрайт
 *
 * Пример использования в css:
 * background: url('sprite-mono.svg#icon-name-view') no-repeat;
 * background-size: 20px;
 *
 * Пример использования в html:
 * <svg width="50" height="50" aria-hidden="true"><use href="#icon-name"></use></svg>
 *
 * @link https://github.com/svg/svgo
 */

// Сторонние библиотеки
import { src, dest, watch, series, parallel } from 'gulp' // gulp плагин
import filesExist from 'files-exist' // проверяет файл на существование
import concat from 'gulp-concat' // объединяет несколько файлов в один
import svgSprite from 'gulp-svg-symbol-view' // создает спрайт
import replace from 'gulp-replace' // замена текста внутри файла

// Конфиги
import config from '../config'

// Создание черно-белого svg спрайта
const spriteMono = () =>
  // входящие файлы
  src(
    filesExist(`${config.src.assets.icons.mono}/**/*.svg`, {
      exceptionMessage: 'Нет ни одного файла svg',
    }),
  )
    .pipe(
      svgSprite({
        svgo: {
          plugins: [
            { cleanupIDs: true }, // удалить id
            { removeRasterImages: true }, // удалить растровые изображения
            { removeStyleElement: true }, // удалить <style>
            { removeUselessDefs: true }, // удалить <defs>
            { removeViewBox: false }, // удалить ViewBox
            { removeComments: true }, // удалить комментарии
            {
              removeAttrs: {
                attrs: ['class', 'data-name'], // удалить указанные атрибуты, 'fill', 'stroke.*'
              },
            },
          ],
        },
      }),
    )
    .pipe(concat('sprite-mono.svg')) // объединение файлов
    .pipe(dest(config.src.assets.icons.root)) // исходящий файл
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Создание цветного svg спрайта
const spriteMulti = () =>
  // входящие файлы
  src(
    filesExist(`${config.src.assets.icons.multi}/**/*.svg`, {
      exceptionMessage: 'Нет ни одного файла svg',
    }),
  )
    .pipe(
      svgSprite({
        svgo: {
          plugins: [
            { cleanupIDs: true }, // удалить id
            { removeUselessDefs: true }, // удалить <defs>
            { removeViewBox: false }, // удалить ViewBox
            { removeComments: true }, // удалить комментарии
            { removeUselessStrokeAndFill: false }, // удалить атрибуты stroke и fill
            { inlineStyles: true }, // поддержка встроенных стилей <style></style>
            {
              removeAttrs: {
                attrs: ['class', 'data-name'], // удалить указанные атрибуты
              },
            },
          ],
        },
      }),
    )
    .pipe(concat('sprite-multi.svg')) // объединение файлов
    .pipe(dest(config.src.assets.icons.root)) // исходящий файл
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Заменяем содержимое файла sprite-mono.svg на пустую строку
const spriteMonoRemove = () =>
  src(`${config.src.assets.icons.root}/sprite-mono.svg`)
    .pipe(replace(/[\s\S]*/g, ''))
    .pipe(dest(config.src.assets.icons.root))

// Заменяем содержимое файла sprite-multi.svg на пустую строку
const spriteMultiRemove = () =>
  src(`${config.src.assets.icons.root}/sprite-multi.svg`)
    .pipe(replace(/[\s\S]*/g, ''))
    .pipe(dest(config.src.assets.icons.root))

// Создание спрайтов
const createSprites = parallel(spriteMono, spriteMulti)

// Очистка спрайтов
const removeSprites = parallel(spriteMonoRemove, spriteMultiRemove)

// Копирование спрайтов в build
const copySprites = () =>
  src([`${config.src.assets.icons.root}/sprite-*.svg`]).pipe(
    dest(config.build.images),
  )

// Сборка всех тасков
export const spritesBuild = series(removeSprites, createSprites, copySprites)

// Слежение за изменением файлов
export const spritesWatch = () => {
  watch(
    `${config.src.assets.icons.mono}/**/*.svg`,
    { ignoreInitial: false },
    series(spriteMonoRemove, spriteMono, copySprites),
  )

  watch(
    `${config.src.assets.icons.multi}/**/*.svg`,
    { ignoreInitial: false },
    series(spriteMultiRemove, spriteMulti, copySprites),
  )
}
