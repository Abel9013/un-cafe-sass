const { src, dest, watch, series } = require('gulp');
// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// Imagenes
const imagemin = require('gulp-imagemin');
const gulp = require('gulp');
const webp = require('gulp-webp');
const avif = require('gulp-avif')

function css(done){
  //Compilar sass
  //PASOS: 1) identificar archivos 2) Compilarlos 3) Guardar el .css
  src("src/scss/app.scss")
  .pipe( sass({outputStyle: 'expanded'}) )
  .pipe(postcss([autoprefixer()]))
  .pipe( dest('build/css') )
  done()
}
function versionWebp(){
  // en vez de pasar por paranetro done y llamarlo al finalizar, coloco el return
  return  src("src/img/**/*.{png,jpg}")
            .pipe( webp() )
            .pipe( dest("build/img") )
}
function versionAvif(){
  const opciones = {
    quality: 50
  }
  return  src("src/img/**/*.{png,jpg}")
            .pipe( avif(opciones) )
            .pipe( dest("build/img") )
  
}
function imagenes(done){
  src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe( dest('build/img') )
  done()
}
function dev(){
  watch("src/scss/**/*.scss",  css)
  watch("src/img/**/*", imagenes)
}
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
// exports.default = series(imagenes, versionWebp, versionAvif, css, dev );
exports.default = series( css, dev );