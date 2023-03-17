const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
function css(done){
  //Compilar sass
  //PASOS: 1) identificar archivos 2) Compilarlos 3) Guardar el .css
  src("src/scss/app.scss")
      .pipe( sass({outputStyle: 'compressed'}) )
      .pipe(postcss([autoprefixer()]))
      .pipe( dest('build/css') )
    done()
}
function dev(){
  watch("src/scss/**/*.scss",  css)
}
function tareaDefault(done){
  console.log('Soy la tarea por default')
  done()
}
exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);