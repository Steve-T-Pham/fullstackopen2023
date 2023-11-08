const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => 
        sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const { title, author, likes } = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return { title, author, likes }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}