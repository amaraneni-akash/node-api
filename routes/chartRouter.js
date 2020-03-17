const express = require('express');
const chartContoller = require('../controller/chartController');

const chartRouter = express.Router();

function routes(Chart) {
  const controller = chartContoller(Chart);
  // To get and post chart data
  chartRouter.route('/charts')
    .post(controller.post)
    .get(controller.get);

  // Middleware
  chartRouter.use('/charts/:chartId', (request, response, next) => {
    Chart.findById(request.params.chartId, (err, chart) => {
      if (err) {
        return response.send(err);
      }
      if (chart) {
        request.chart = chart;
        return next();
      }
      return response.sendStatus(404);
    });

    // To get and put Single chart data
    chartRouter.route('/charts/:chartId')
      .delete((req, res) => {
        req.chart.remove((err) => {
          if (err) {
            res.send(err);
          }
          return res.sendStatus(204);
        });
      })
      .patch((req, res) => {
        const { chart } = req;
        // eslint-disable-next-line no-underscore-dangle
        if (req.body._id) {
          // eslint-disable-next-line no-underscore-dangle
          delete req.body._id;
        }
        Object.entries(req.body).forEach((item) => {
          // eslint-disable-next-line prefer-destructuring
          chart[item[0]] = item[1];
        });
        req.chart.save((err) => {
          if (err) {
            res.send(err);
          }
          return res.json(chart);
        });
      })
      .put((req, res) => {
        const { chart } = req;
        chart.name = req.body.name;
        chart.type = req.body.type;
        chart.data = req.body.data;
        chart.save((err) => {
          if (err) {
            res.send(err);
          }
          return res.json(chart);
        });
      })
      .get((req, res) => {
        const newChart = req.chart.toJSON();
        newChart.links = {};
        const type = newChart.type.replace(' ', '%20');
        newChart.links.findByChartType = `http://${req.headers.host}/api/charts?type=${type}`;
        return res.json(newChart);
      });
  });
  return chartRouter;
}

module.exports = routes;
