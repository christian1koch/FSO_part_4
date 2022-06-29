require("express-async-errors");
const jwt = require('jsonwebtoken')
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
blogsRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  console.log(body);
  const blog = new Blog({
    ...request.body,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndUpdate(id, request.body);
  response.status(204).end();
});
module.exports = blogsRouter;
