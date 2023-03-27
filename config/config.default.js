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
  };
  // config.static = {
  //   prefix: '/assets/',
  //   dir:[path.join(__dirname, '../app/assets')]
  // };
  // config.static => 在更新证书验证阶段，需要使用well-known，在日常运行阶段 需要用assets 注意在更新证书阶段和更新完成后修改
  config.static = {
    prefix: '/.well-known/',
    dir: [path.join(__dirname, '../.well-known')]
   }

  return config;
};
