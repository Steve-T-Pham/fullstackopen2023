const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)

    try{
        const savedBlog = await blog.save()
        res.status(201).json(savedBlog)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updatedBlog)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = blogsRouter