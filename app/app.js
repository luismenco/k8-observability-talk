const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");
const externalRouter = require("./routes/ExternalRoutes");
const app = express();

const logger = require('./utils/logger');
const apiMetrics = require('prometheus-api-metrics');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiMetrics({
  additionalLabels: ['app'],
  extractAdditionalLabelValuesFn: (req, res) => {
      return {
        app: "api-blogs"
      }
  }
}))

app.use("/api/blogs", blogRouter);
app.use("/api/external", externalRouter);
app.get("/",(req,res) => res.json({
  "GET /api/blogs": "All blogs ", 
  "GET /metrics": "Metrics data",
}));

//configure mongoose
mongoose.connect(
  // process.env.MONGODB_URI || "mongodb://admin:admin1234@localhost:27017/admin?connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256&directConnection=true&replicaSet=demo-mongodb&readPreference=secondaryPreferred&w=majority",

  process.env.MONGODB_URI || "mongodb://admin:admin1234@localhost:27018/admin?connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256&directConnection=false&replicaSet=demo-mongodb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      logger.error(err)
    } else {
      logger.info("Connected to MongoDB");
    }
  }
);

app.listen(3000, () => {
  logger.info(`Server is running on port `);
});

module.exports = app;