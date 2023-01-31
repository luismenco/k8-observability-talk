const BlogModel = require('../models/Blog')
const logger = require('../utils/logger')


function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}

exports.getAllBlogs = async () => {
  try {
    logger.info('getting all blog')
    return await BlogModel.find()
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

exports.createBlog = async (blog) => {
  try {
    if (blog.title === '' || blog.body === '')
      throw new UserException('title and body are required');
    logger.info('creating blog' + blog)
    return await BlogModel.create(blog)
  } catch (error) {
    logger.error(error.message)
    throw new Error(error.message)
  }
}

exports.getBlogById = async (id) => {
  try {
    logger.info('getting blog with id: ' + id)
    return await BlogModel.findById(id)
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

exports.updateBlog = async (id, blog) => {
  try {
    logger.info('updating blog with id: ' + id + ' with data: ' + blog)
    return await BlogModel.findByIdAndUpdate(id, blog)
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}

exports.deleteBlog = async (id) => {
  try {
    logger.info('getting all blog')
    return await BlogModel.findByIdAndDelete(id)
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}
