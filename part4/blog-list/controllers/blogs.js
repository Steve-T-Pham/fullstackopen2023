const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', (req, res) => {
    Blog.find({}).then(blog =>
        res.json(blog))
})

blogsRouter.post('/:id', (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(savedBlog => res.status(201).json(savedBlog))
        .catch(err => next(err))
})

module.exports = blogsRouter