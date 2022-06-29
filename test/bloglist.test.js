const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const listHelper = require("../utils/list_helper");

const testBlog = {
  title: "Test blog",
  author: "Christian K Echeverria",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
  __v: 0,
};

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("there are the right number of blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a blog should be successfully added", async () => {
  await api
    .post("/api/blogs")
    .send(testBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain("Test blog");
});

test("a blog should be able to be deleted", async () => {
  const firstBlogId = initialBlogs[0]._id;
  await api 
    .delete(`/api/blogs/${firstBlogId}`)
    .expect(204);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length - 1);
    
}, 100000)

test("a blog should be able to be updated", async () => {
  const firstBlogId = initialBlogs[0]._id;
  await api
    .put(`/api/blogs/${firstBlogId}`)
    .send(testBlog)
    .expect(204)

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("Test blog");
})
afterAll(() => {
  mongoose.connection.close();
});

// test("dummy returns one", () => {
//   const blogs = [];

//   const result = listHelper.dummy(blogs);
//   expect(result).toBe(1);
// });

// describe("total likes", () => {
//   listWithOneBlog = [initialBlogs[0]]; // likes equal 7
//   test("when list has only one blog, equals the likes of that", () => {
//     const result = listHelper.totalLikes(listWithOneBlog);
//     expect(result).toBe(7);
//   });
//   //total likes 36
//   test("it should return the sum of all the likes", () => {
//     const result = listHelper.totalLikes(blogList);
//     expect(result).toBe(36);
//   });
// });

// describe("favourite blog", () => {
//   test("when list has only one blog, that one is the favourite blog", () => {
//     const result = listHelper.favoriteBlog(blogList);
//     expect(result).toEqual(initialBlogs[2]);
//   });
// });

// describe("most author blog", () => {
//     test("test for groupby", () => {
//       const result = listHelper.mostBlogs(blogList);
//       expect(result).toEqual(["Robert C. Martin", 3]);
//     });
//   });
