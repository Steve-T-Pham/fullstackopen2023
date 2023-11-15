const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        "title": "Blog 1",
        "author": "Steve Pham",
        "url": "test1",
        "likes": 0
    },
    {
        "title": "Blog 2",
        "author": "Steve Pham",
        "url": "test2",
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

test('successfully delete blog post', async () => {
    const blogsAtStart = await (await Blog.find({})).map(blog => blog.toJSON())
    const blogToDelete = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await (await Blog.find({})).map(blog => blog.toJSON())
    
    expect(blogsAtEnd).toHaveLength(
        initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 10000)

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
}, 10000)

test('blog has unique id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
        expect(blog._id).toBeUndefined()
    })
})

test('blog successfully posts', async () => {
    const newBlog = {
        "title": "Blog 3",
        "author": "Steve Pham",
        "url": "test3",
        "likes": 0
    }

    let blogObject = new Blog(newBlog)
    await blogObject.save()
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(response.body.find(blog => 
        blog.title === newBlog.title && 
        blog.author === newBlog.author && 
        blog.url === newBlog.url && 
        blog.likes === newBlog.likes)).toBeDefined()
})

test('likes is initialized to 0', async () => {
    const newBlog = {
        "title": "Blog 4",
        "author": "Steve Pham",
        "url": "test4"
    }

    let blogObject = new Blog(newBlog)
    await blogObject.save()
    const response = await api.get('/api/blogs')
    expect(response.body.find(blog => blog.title === newBlog.title).likes).toEqual(0)
})

test('return status 400 if title/url are missing', async () => {
    const newBlog = {
        "url": "test4",
        "likes": 0
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('update a note already in database', async () => {
    const blogsAtStart = await (await Blog.find({})).map(blog => blog.toJSON())
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        likes: blogToUpdate.likes + 1
    }

    const res = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toBe(blogToUpdate.likes + 1)
})

afterAll(async () =>
    await mongoose.connection.close()
)
