const { src, dest, watch, series, parallel } = require ('gulp');

// css and sass
const sass = require ('gulp-sass')(require('sass'));
const postcss = require ('gulp-postcss');
const autoprefixer = require ('autoprefixer');

// image
const imagemin = require ( 'gulp-imagemin' );
const webp = require ( 'gulp-webp' );
const avif = require ( 'gulp-avif' );


function css(done){
    src ('src/scss/app.scss')
        .pipe (sass())
        .pipe (postcss( [ autoprefixer() ] ) )
        .pipe (dest('build/css'))
    
    done();
}

function imgWebp () {
    const opciones = {
        quality: 50
    }

    return src ( 'src/img/**/*.{png,jpg}' )
        .pipe ( webp(opciones) )
        .pipe ( dest ( 'build/img' ) );
}

function imgAvif () {
    const opciones = {
        quality: 50
    }

    return src ( 'src/img/**/*.{png,jpg}' )
        .pipe ( avif (opciones) )
        .pipe ( dest ( 'build/img' ) );
}

function images () {
    return src ( 'src/img/**/*' )
        .pipe ( imagemin ( { optimizationLevel: 3 } ) )
        .pipe ( dest ( 'build/img' ) );
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch( 'src/img/**/*', images );
}


exports.css = css;
exports.dev = dev;
exports.images = images;
exports.imgWebp = imgWebp;
exports.imgAvif = imgAvif;
exports.default = series(images, imgAvif, imgWebp, css, dev);
