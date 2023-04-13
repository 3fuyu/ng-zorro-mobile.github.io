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

  router.post('/createFineTune', controller.openAi.createFineTune);
  router.get('/listFineTunes', controller.openAi.listFineTunes);
  router.get('/listFineTuneEvents', controller.openAi.listFineTuneEvents);
  router.get('/retrieveFineTune', controller.openAi.retrieveFineTune);
  router.post('/cancelFineTune', controller.openAi.cancelFineTune);
  router.post('/deleteFineTune', controller.openAi.deleteFineTune);

  router.get('/listFiles', controller.openAi.listFiles);
  router.post('/uploadFile', controller.openAi.uploadFile);
  router.post('/deleteFile', controller.openAi.deleteFile);
  router.get('/retrieveFile', controller.openAi.retrieveFile);
  router.get('/retrieveFileContent', controller.openAi.retrieveFileContent);

  router.post('/createEmbedding', controller.openAi.createEmbedding);
};
