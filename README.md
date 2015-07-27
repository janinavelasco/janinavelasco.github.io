#Blank Project - Static Sites

This is a project that's ready to begin work using the following tech stack:

* HTML includes with gulp-file-include
* Sass Css Preprocessing
* Uglify and Concat on Javascript

Put source code in the src/ directory, it will get processed into ./index.html and public/

## Getting Started

Use 

    gulp

to build the site, or 

    gulp serve

to run the default build and start a browser-sync server and watch for changes on html, sass, and js.

## Options

If you want to turn on sourcemaps and turn off uglify, likely for debugging:

    gulp serve --compress off

**Note**: Sourcemaps will add weight to main.css and not uglifying will add weight to main.js
