const _ = require("lodash");

const dummy = (blogs) => {
  return Array.isArray(blogs) ? 1 : -1;
};
const totalLikes = (blogs) => {
  const likesOfBlogs = blogs.map((blog) => blog.likes);
  const reducer = (sum, item) => {
    return sum + item;
  };
  return likesOfBlogs.reduce(reducer, 0);
};
const favoriteBlog = (blogs) => {
  const largestNumberOfLikes = blogs
    .map((blog) => blog.likes)
    .reduce((lastValue, nextValue) => {
      return Math.max(lastValue, nextValue);
    }, 0);
  console.log("largest number of likes: ", largestNumberOfLikes);
  return blogs[blogs.findIndex((blog) => blog.likes === largestNumberOfLikes)];
};

const mostBlogs = (blogs) => {
  const authorsNumOfBlogs = _.countBy(blogs, "author");
  const toArray = _.toPairs(authorsNumOfBlogs);
  const ordered = _.orderBy(toArray, (item) => item[1], "desc");
  return ordered[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
