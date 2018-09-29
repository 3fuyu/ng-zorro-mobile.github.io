'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/issue-helper', controller.home.issueHelper);
  router.get('/publish', controller.home.publish);
  router.post('/publish', controller.home.publish);
};
