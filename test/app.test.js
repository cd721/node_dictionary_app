import { expect } from 'chai';  // Named import from 'chai'
import request from 'supertest';  // Importing supertest for making requests
import app from '../app.js';  // Adjust the path to your 'app.js' file
import winston from 'winston';  // Importing winston for logging

// Set up the logger with Winston
const logger = winston.createLogger({
  level: 'info',  // Set the default logging level
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),  // Colorize the logs for readability
        winston.format.simple()     // Simple log format
      )
    })
  ]
});

describe('API Tests', function() {
  // Test for the home route
  it('should return 200 for valid home route', function(done) {
    request(app)
      .get('/')  // Perform a GET request to the home route
      .end((err, res) => {
        if (err) return done(err);  // If error, pass it to done
        
        // Log the response using Winston logger
        logger.info('Response Body:', res.body);
        
        // Assert the response status is 200
        expect(res.status).to.equal(200);
        done();  // Signal that the test is complete
      });
  });

  // Test for a valid word route
  it('should return 200 for valid word route', function(done) {
    request(app)
      .get('/deterministic')  // Perform a GET request to '/deterministic'
      .end((err, res) => {
        if (err) return done(err);
        
        // Log the response using Winston logger
        logger.info('Response Body:', res.body);
        
        // Assert the response status is 200
        expect(res.status).to.equal(200);
        done();
      });
  });

  // Test for an invalid word with suggestions (should redirect)
  it('should return 302 for invalid word with suggestions', function(done) {
    request(app)
      .get('/meak')  // Perform a GET request to '/meak'
      .end((err, res) => {
        if (err) return done(err);
        
        // Log the response
        logger.info('Response Body:', res.body);
        
        // Assert the response status is 302 (redirect)
        expect(res.status).to.equal(302);
        done();
      });
  });

  // Test for an invalid word with no suggestions (should return 404)
  it('should return 404 for invalid word with no suggestions', function(done) {
    request(app)
      .get('/908o7yit')  // Perform a GET request to an invalid word
      .end((err, res) => {
        if (err) return done(err);
        
        // Log the response
        logger.info('Response Body:', res.body);
        
        // Assert the response status is 404
        expect(res.status).to.equal(404);
        done();
      });
  });

  // Test for a word that is just whitespace (should return 400)
  it('should return 400 for word that is whitespace', function(done) {
    request(app)
      .get('/  ')  // Perform a GET request to a route with whitespace
      .end((err, res) => {
        if (err) return done(err);
        
        // Log the response
        logger.info('Response Body:', res.body);
        
        // Assert the response status is 400
        expect(res.status).to.equal(400);
        done();
      });
  });
});