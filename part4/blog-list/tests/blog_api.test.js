const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        "title": "Blog 1",
        "author": "Steve Pham",
        "url": "localhost:3003/api/blogs/1",
        "likes": 0
    },
    {
        "title": "Blog 2",
        "author": "Steve Pham",
        "url": "localhost:3003/api/blogs/2",
        "likes": 0
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
 })

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog has unique id', async () => {
    const res = await api.get('/api/blogs')

    res.body.forEach(blog => {
        expect(blog.id).toBeDefined()
        expect(blog._id).toBeUndefined()
    })
})

afterAll(async () =>
    await mongoose.connection.close()
)
