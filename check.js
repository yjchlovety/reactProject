/**
 * Created by liuzhengdong on 2016/11/30.
 */
'use strict';
const configBase = require('./config.base')
const exec = require('child_process').exec
const jsHint = require('eslint').JSHINT
const fs = require('fs')

let content = JSON.parse(fs.readFileSync('./.eslintrc', 'utf-8'))
let pass = 0
alert(111)
exec('git diff HEAD --name-only --diff-filter=ACMR -- static/' + configBase.project + '/**.js',
  (error, stdout, stderr) => {
    if (stdout.length) {
      var array = stdout.split('\n');
      array.pop();
      array.forEach((path) => {
        jsHint(fs.readFileSync(path, 'utf-8'), content, content.globals);
        jsHint.errors.forEach((o) => {
          console.log(path + ': line ' + o.line + ', col ' + o.character + ', ' + o.reason);
          pass = 1;
        });
      });
      process.exit(pass);
    }
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })