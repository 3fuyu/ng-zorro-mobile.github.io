'use strict';
const { Configuration, OpenAIApi } = require('openai');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // 例如：参数中的密码是加密的，在此处进行解密
    const configuration = new Configuration({
      organization: this.app.config.openAiOrg,
      apiKey: this.app.config.openAiKey,
    });
    const openAi = new OpenAIApi(configuration);
    this.app.config.openAi = openAi;
  }
}

module.exports = AppBootHook;