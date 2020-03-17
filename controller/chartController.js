function chartController(Chart) {
  // eslint-disable-next-line consistent-return
  function post(req, res) {
    const chart = new Chart(req.body);
    if (!req.body.name) {
      res.status(400);
      return res.send('Name is required');
    }
    chart.save((err) => {
      if (err) {
        return res.send(err);
      }
      res.status(201);
      return res.json(chart);
    });
  }

  function get(req, res) {
    const query = {};
    // For getting data based on chart type
    if (req.query.type) {
      query.type = req.query.type;
    }
    Chart.find(query, (err, charts) => {
      if (err) {
        return res.send(err);
      }

      const returnChart = charts.map((chart) => {
        const newChart = chart.toJSON();
        newChart.links = {};
        newChart.links.self = `http://${req.headers.host}/api/charts/${chart._id}`;
        return newChart;
      });
      return res.json(returnChart);
    });
  }

  return { post, get };
}

module.exports = chartController;
