const express = require('../config/express')();
const request = require('supertest')(express);

require('./controllers/ProductControllerTest')(request);