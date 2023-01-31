const axios = require('axios');
const logger = require('./utils/logger');

exports.getAllBlogs = async (req, res) => {
  try {
    logger.info("starting request to external api")
    const blogs = await axios.get('http://localhost:3000/api/blogs');;
    res.json({ data: blogs.data, status: "success" });
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ error: err.message });
  }
};
