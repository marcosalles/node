/* Dependencies */
const express = require('../config/express')();
const request = require('supertest')(express);
const databaseCleaner = require('./DatabaseCleaner')(express.daos.BaseDao);

/* Test suits */
const productControllerTest = require('./controllers/ProductControllerTest');

/* Tests */
productControllerTest(request, databaseCleaner);