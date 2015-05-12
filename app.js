'use strict';

var fs = require('fs'),
  glob = require('glob'),
  pettern = /\/store\/apps\/details\?id=[\w.]+/g,
  sources = glob.sync('./sources/*.txt');

if (!fs.existsSync('outputs')) {
  fs.mkdirSync('outputs');
}

sources.forEach(function (source) {
  var category = source.replace('./sources/', '');
  var html = fs.readFileSync(source).toString();
  var matches = html.match(pettern);
  var data = cleanData(matches);

  fs.writeFileSync('./outputs/' + category, data);
  console.log(category, 'done');
});

function cleanData(arr) {
  var apps = [], data = '';

  arr.forEach(function (value) {
    value = value.replace('/store/apps/details?id=', '');
    if (apps.indexOf(value) === -1) {
      apps.push(value);
      data = data + value + '\r\n';
    }
  });

  return data;
};
