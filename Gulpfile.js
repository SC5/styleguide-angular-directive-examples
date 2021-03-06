var gulp = require('gulp');
var sass = require('gulp-sass');
var styleguide = require('sc5-styleguide');
var outputPath = 'output';

gulp.task('styleguide:generate', function() {
  return gulp.src('styles/*.scss')
    .pipe(styleguide.generate({
      title: 'My Styleguide',
      server: true,
      rootPath: outputPath,
      overviewPath: 'README.md',
      port: 3002,
      "styleVariables": "styles/*.scss",
      "sass": {
        "src": "lib/app/sass/main.scss"
      },
      "filesConfig": [
        {
          "name": "sgDirectives",
          "files": [
            "directives/sg-input.js"
          ]
        }
      ]
    }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('styles/main.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles({
      port: 3002
    }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('copy', function() {
  return gulp.src('directives/**/*.js')
    .pipe(gulp.dest(outputPath + '/directives'));
});

gulp.task('watch', ['styleguide'], function() {
  // Start watching changes and update styleguide whenever changes are detected
  // Styleguide automatically detects existing server instance
  gulp.watch(['styles/*.scss'], ['styleguide']);
  gulp.watch(['directives/**/*.js'], ['copy']);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles', 'copy']);