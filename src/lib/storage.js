'use strict';

const logger = require('./logger');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

const storage = module.exports = {};

storage.create = function create(schema, item) {
  if (!schema) return Promise.reject(new Error('Cannot create a new item, schema required'));
  if (!item) return Promise.reject(new Error('Cannot create a new item, item required'));

  const json = JSON.stringify(item);

  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, json)
    .then(() => {
      logger.log(logger.INFO, 'STORAGE: Created a new resource');
      return item;
    })
    .catch(err => Promise.reject(err));
};

storage.fetchOne = function fetchOne(schema, id) {
  if (!schema) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((data) => {
      try {
        const item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });

  // return new Promise((resolve, reject) => {
  //   if (!schema) return reject(new Error('expected schema name'));
  //   if (!id) return reject(new Error('expected id'));
  //   if (!memory[schema]) return reject(new Error('schema not found'));
  //   const item = memory[schema][id];
  //   if (!item) {
  //     return reject(new Error('item not found'));
  //   }
  //   return resolve(item);
  // });
};

// storage.fetchAll = function fetchAll(schema) {
//   return new Promise((resolve, reject) => {
//     if (!schema) return reject(new Error('expected schema name'));
//     if (!memory[schema]) return reject(new Error('schema not found'));
//     const all = [];
//     return resolve(all);
//   });
// };

// storage.update = function update(schema, id, title, content) {
//   return new Promise((resolve, reject) => {
//     if (!schema) return reject(new Error('expected schema name'));
//     if (!id) return reject(new Error('expected id'));
//     if (!memory[schema]) return reject(new Error('schema not found'));
//     const item = memory[schema][id];
//     if (!item) return reject(new Error('no item found'));
//     item.id = id;
//     item.title = title;
//     item.content = content;
//     return resolve(item);
//   });
// };

// storage.delete = function del() {

// };
