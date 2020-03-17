// const should = require('should');
const sinon = require('sinon');
const chartController = require('../controller/chartController');

/* global describe, it */
/* eslint no-undef: "error" */
describe('Chart Contoller Tests:', () => {
  describe('Post', () => {
    it('Should not allow an Empty name', () => {
      // eslint-disable-next-line no-unused-vars
      const Chart = function saveChart(chart) { this.save = () => { }; };

      const req = {
        body: {
          data: 'Akash',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = chartController(Chart);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Name is required').should.equal(true);
    });
  });
});
