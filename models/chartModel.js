const mongoose = require('mongoose');

const { Schema } = mongoose;

const chartModel = new Schema(
  {
    name: { type: String },
    type: { type: String },
    data: { type: String },
  },
  { versionKey: false },
);

module.exports = mongoose.model('Chart', chartModel);
