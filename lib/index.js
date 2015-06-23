'use strict';

var fs = require('fs'),
    path = require('path');

var y2nw = require('y2nw'),
    nwrun = require('nwrun');

var chromedriver = require('chromedriver');

function is_dir(filepath) {
  return fs.existsSync(filepath) && fs.statSync(filepath).isDirectory();
}

module.exports = function(argv, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (typeof argv === 'function') {
    callback = argv;
    options = {};
    argv = {};
  }

  if (!options) {
    options = {};
  }

  if (!argv) {
    argv = {};
  }

  if (!is_dir(options.src)) {
    throw new Error('invalid `' + options.src + '` directory');
  }

  y2nw(options, function() {
    nwrun({
      force: argv.force,
      standalone: argv.remote !== true,
      src_folders: path.join(options.dest, 'tests'),
      output_folder: path.join(options.dest, 'report'),
      test_settings: {
        'default': {
          desiredCapabilities: {
            browserName: argv.browser || 'chrome'
          },
          cli_args: {
            'webdriver.chrome.driver': chromedriver.path
          }
        }
      }
    }, callback);
  });
};