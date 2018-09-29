'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const href = ctx.href;
    const diamond = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/diamond.json'), 'utf-8'));
    let version = '';

    if (href.includes('version')) {
      version = href.match(/version\/(\S*)\//)[1];
    }

    const data = { name: 'ng-zorro-mobile', zorroMobileUrlPrefix: diamond.zorroMobileUrlPrefix + (version || diamond.version) + '/'};

    await ctx.render('index.html', data);
  }

  async issueHelper() {
    await this.ctx.render('issue_helper.html');
  }

  async publish() {
    const { ctx } = this;
    const token = '__dt_wl__';
    const diamond = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/diamond.json'), 'utf-8'));
    const data = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    if (data.token === token) {
      delete data.token;
      const result = {
        ...diamond,
        ...data
      };

      fs.writeFileSync(path.join(__dirname, '../assets/diamond.json'), JSON.stringify(result));

      ctx.body = result;
    } else {
      ctx.body = 'Github: https://github.com/NG-ZORRO/ng-zorro-antd-mobile';
    }
  }
}

module.exports = HomeController;
