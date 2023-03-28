'use strict';

const Controller = require('egg').Controller;
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

class OpenAiController extends Controller {
  async openAi() {
    const { ctx } = this;
    const { model, prompt, temperature, max_tokens, apiKey } = ctx.query;
    const { openAi } = this.app.config;

    try {
      const completion = await openAi.createCompletion({
        model: model || 'text-davinci-003',
        prompt: prompt || 'hello world',
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 4096,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      ctx.body = {
        code: 0,
        data: completion.data.choices[0].text,
      };
    } catch (e) {
      if (e.toString().includes('401') && apiKey) {
        const configuration = new Configuration({
          organization: this.app.config.openAiOrg,
          apiKey,
        });
        const openAi = new OpenAIApi(configuration);

        const completion = await openAi.createCompletion({
          model: model || 'text-davinci-003',
          prompt: prompt || 'hello world',
          temperature: temperature || 0.7,
          max_tokens: max_tokens || 4096,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        ctx.body = {
          code: 0,
          data: completion.data.choices[0].text,
        };
      } else {
        ctx.body = {
          code: 500,
          data: e,
        };
      }
    }
  }

  async openAiChat() {
    const { ctx, ctx: { query: { isEnd = false, prompt: user_input } } } = this;
    const configuration = new Configuration({
      apiKey: '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',
    });

    const openai = new OpenAIApi(configuration);
  
    if (isEnd) {
      this.app.ai.history = [];
    }

    const history = this.app.ai.history;

    const messages = [];
    for (const [ input_text, completion_text ] of history) {
      messages.push({ role: 'user', content: input_text });
      messages.push({ role: 'assistant', content: completion_text });
    }
    messages.push({ role: 'user', content: user_input });
    console.log('messages: ', messages);
    console.log('history: ', history);

    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      });

      const completion_text = completion.data.choices[0].message.content;
      console.log(completion_text);

      history.push([ user_input, completion_text ]);

      this.app.ai.history = history;
      ctx.body = {
        code: 0,
        data: completion_text,
      };
    } catch (error) {
      if (error.response) {
        ctx.body = {
          code: error.response.status,
          data: error.response.data,
        };
      } else {
        ctx.body = {
          code: 500,
          data: error.message,
        };
      }
    }
  }
}

module.exports = OpenAiController;
