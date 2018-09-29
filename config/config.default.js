'use strict';

const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1537930361837_8448';

  // add your config here
  config.middleware = [];

  config.view = {
    mapping: {
      '.html': 'nunjucks'
    }
  }

  config.static = {
    prefix: '/assets/',
    dir:[path.join(__dirname, '../app/assets')]
  };

  return config;
};
