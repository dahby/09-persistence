'use strict';

const logger = require('../lib/logger');
const Food = require('../model/food');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routeFood(router) {
  router.post('/api/v1/food', (req, res) => {
    logger.log(logger.INFO, 'FOOD-ROUTE: POST /api/v1/food');

    try {
      const newFood = new Food(req.body.title, req.body.content);
      storage.create('Food', newFood)
        .then((food) => {
          response.sendJSON(res, 201, food);
          return undefined;
        }); 
    } catch (err) {
      logger.log(logger.ERROR, `FOOD-ROUTE: There was a bad request ${err}`);
      response.sendError(res, 400, err.message);
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/food', (req, res) => {
    logger.log(logger.INFO, 'FOOD-ROUTE: GET /api/v1/food');
    if (!req.url.query.id) {
      response.sendError(res, 400, 'Your request requires an id');
      return undefined;
    }

    storage.fetchOne('Food', req.url.query.id)
      .then((item) => {
        response.sendJSON(res, 200, item);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendError(res, 404, 'Resource not found');
        return undefined;
      });
    return undefined;
  });

  // router.get('/api/v1/food', (req, res) => {
  //   logger.log(logger.INFO, 'FOOD-ROUTE: GET food array');
  //   storage.fetchAll('Food')
  //     .then((item) => {
  //       const foodArray = [];
  //       Object.keys(item).forEach(key => foodArray.push(item[key].id));
  //       response.sendJSON(res, 200, item);
  //       return undefined;
  //     })
  //     .catch((err) => {
  //       logger.log(logger.ERROR, err, JSON.stringify(err));
  //       response.sendError(res, 404, 'Resource not found');
  //       return undefined;
  //     });
  //   return undefined;
  // });

  router.put('/api/v1/food', (req, res) => {
    logger.logg(logger.INFO, 'FOOD-ROUTE: UPDATE food');
    if (!req.body.id) {
      response.sendError(res, 200, 'Update request requires id');
      return undefined;
    }
    try {
      storage.update('Food', req.url.query.id)
        .then((food) => {
          response.sendJSON(res, 200, food);
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `FOOD-ROUTE: Bad request ${err}`);
      response.sendError(res, 404, 'PUT Resource not found');
      return undefined;
    }
    return undefined;
  });

  router.delete('/api/v1/food', (req, res) => {
    logger.log(logger.INFO, 'FOOD-ROUTE: DEL /api/v1/food');
    if (!req.url.query.id) {
      response.sendError(res, 400, 'Delete request requires id');
      return undefined;
    }
    storage.delete('Food', req.url.query.id)
      .then((food) => {
        logger.log(logger.INFO, `FOOD-ROUTE: DEL ${food}`);
        response.sendJSON(res, 204, food);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, `FOOD-ROUTE: Bad request ${err}`);
        response.sendError(res, 404, 'DEL resource bad request');
        return undefined;
      });
    return undefined;
  });
};
