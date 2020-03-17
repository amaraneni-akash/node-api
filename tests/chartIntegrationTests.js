require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.env = 'Test';

const app = require('../app.js');

const Chart = mongoose.model('Chart');
const agent = request.agent(app);
/* global describe, it, afterEach */
/* eslint no-undef: "error" */
describe('Chart crud Test', () => {
  it('Should allow a chart to be posted and return read and _it', (done) => {
    const chartPost = { name: 'asdfgh', type: 'nfdsdf', data: 'hgfdsd' };

    agent.post('/api/charts')
      .send(chartPost)
      .expect(201)
      .end((err, results) => {
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Chart.deleteMany({}).exec();
    done();
  });
});
