'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/version/*', controller.home.index);
  router.get('/issue-helper', controller.home.issueHelper);
  router.get('/publish', controller.home.publish);
  router.post('/publish', controller.home.publish);
  router.get('/openAi', controller.openAi.openAi);
  router.get('/openAiChat', controller.openAi.openAiChat);

  router.post('/openai/createFineTune', controller.openAi.createFineTune);
  router.get('/openai/listFineTunes', controller.openAi.listFineTunes);
  router.get('/openai/listFineTuneEvents', controller.openAi.listFineTuneEvents);
  router.get('/openai/retrieveFineTune', controller.openAi.retrieveFineTune);
  router.post('/openai/cancelFineTune', controller.openAi.cancelFineTune);
  router.post('/openai/deleteFineTune', controller.openAi.deleteFineTune);

  router.get('/openai/listFiles', controller.openAi.listFiles);
  router.post('/openai/uploadFile', controller.openAi.uploadFile);
  router.post('/openai/deleteFile', controller.openAi.deleteFile);
  router.get('/openai/retrieveFile', controller.openAi.retrieveFile);
  router.get('/openai/retrieveFileContent', controller.openAi.retrieveFileContent);

  router.post('/openai/createEmbedding', controller.openAi.createEmbedding);
};
