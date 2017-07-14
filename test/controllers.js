/* Dependencies */
const express = require('../config/express')();
const request = require('supertest')(express);

let baseDao = express.daos.BaseDao;
let productDao = express.daos.ProductDao;
const databaseCleaner = require('./DatabaseCleaner')(baseDao);

/* Test suits */
const productControllerTest = require('./controllers/ProductControllerTest');

/* Tests */
productControllerTest(request, databaseCleaner, productDao);