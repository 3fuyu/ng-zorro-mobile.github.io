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
    const { ctx, ctx: { query: { isEnd = false, prompt: user_input, apiKey } } } = this;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openai = new OpenAIApi(configuration);
  
    if (isEnd) {
      this.app.ai.history[apiKey] = [];
    }

    const history = this.app.ai.history[apiKey] || [];

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

      history.push([ user_input, completion_text ]);

      this.app.ai.history[apiKey] = history;
      ctx.body = {
        code: 0,
        data: completion_text,
        history,
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

  async createFineTune() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, createFineTuneRequest, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.createFineTune(createFineTuneRequest, options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async listFineTunes() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.listFineTunes(options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async listFineTuneEvents() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, fineTuneId, stream = false, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.listFineTuneEvents(fineTuneId, stream, options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async retrieveFineTune() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, fineTuneId, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.retrieveFineTune(fineTuneId, options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async cancelFineTune() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, fineTuneId, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.cancelFineTune(fineTuneId, options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async deleteFineTune() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, model, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.deleteModel(model, options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async listFiles() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.listFiles(options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async uploadFile() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, file, purpose, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.createFile(file, purpose, options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async deleteFile() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, fileId, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.deleteFile(fileId, options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async retrieveFile() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, fileId, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.retrieveFile(fileId, options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async retrieveFileContent() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, fileId, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.downloadFile(fileId, options);

      ctx.body = {
        code: 0,
        data: result.data,
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

  async createEmbedding() {
    const { ctx } = this;
    const params = ctx.request.method === 'GET' ? ctx.query : ctx.request.body;
    const { apiKey, createEmbeddingRequest, options = {} } = params;
    const configuration = new Configuration({
      apiKey: apiKey || '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',
    });

    const openAi = new OpenAIApi(configuration);

    try {
      const result = await openAi.createEmbedding(createEmbeddingRequest, options);

      ctx.body = {
        code: 0,
        data: result.data,
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
