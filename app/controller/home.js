'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
// const axios = require('axios');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const href = ctx.href;
    const diamond = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/diamond.json'), 'utf-8'));
    let version = '';

    if (href.includes('version')) {
      version = href.match(/version\/(\S*)/)[1];
    }

    const data = { name: 'ng-zorro-mobile', zorroMobileUrlPrefix: diamond.zorroMobileUrlPrefix + (version || diamond.version) + '/'};

    await ctx.render('index.html', data);
  }

  async test1() {
    const { ctx } = this;
    await ctx.render('test.html');
  }

  // async test() {
  //   const { ctx } = this;
  //   const href = ctx.href;
  //   const diamond = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/diamond.json'), 'utf-8'));
  //   let version = '';

  //   if (href.includes('version')) {
  //     version = href.match(/version\/(\S*)/)[1];
  //   }

  //   // const data = { name: 'ng-zorro-mobile', zorroMobileUrlPrefix: diamond.zorroMobileUrlPrefix + (version || diamond.version) + '/'};

    
  //   // var data1 = "a";
  //   // var data2 = "b";
  //   // var data3 = "<div style='color:red;'>This is a blob</div>";
  //   // var data4 = { "name": "abc" };

  //   // var blob1 = new Blob([data1]);
  //   // var blob2 = new Blob([data1, data2]);
  //   // var blob3 = new Blob([data3]);
  //   // var blob4 = new Blob([JSON.stringify(data4)]);
  //   // var blob5 = new Blob([data4]);
  //   // var blob6 = new Blob([data3, data4]);
  //   console.log('buffer: ', new Buffer([1, 2]));
  //   // console.log('blob: ', new Blob([1, 2]));

  //   const result = await axios({
  //     url: "https://ng.mobile.ant.design/uploadFile",
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     data: {
  //       "apiKey": "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",
  //       "file": new Buffer('123'),
  //       "purpose": "fine-tune"
  //     } // body data type must match "Content-Type" header
  //   });
  //       // .then(function(response_in) {
  //       //     var inner_text = response_in.text().then(function(inner_text){
  //       //         console.log(i + " 内部完成");
  //       //         resolve( outer_text + " + " + inner_text);
  //       //     });
  //       // });

  //   ctx.body = {
  //     data: result.data
  //   }
  // }

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
