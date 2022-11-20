const express = require("express")

const api = require("./api.js")

const app = express.Router()

// API ENDPOINT CODE WILL GO HERE
app.get("/posts/get-all-blog-posts", async (req, res) => {
    try {
        const apiResponse = await api.getAllBlogPosts();
        res.json(apiResponse);
    } catch (err) {
        return {
            error: true
        }
    }
})

app.get("/posts/get-blog-posts-by-tag", async function (req, res) {
    try {
        const apiResponse = await api.getBlogPostsByTag(req.query.tag);
        res.json(apiResponse);
    } catch (err) {
        return {
            error: true
        }
    }
})

app.get("/posts/get-five-newest-posts", async function (req, res) {
    try {
        const apiResponse = await api.getFiveNewestPosts();
        res.json(apiResponse);
    } catch (err) {
        return {
            error: true
        }
    }
})

app.get("/posts/get-blog-post-by-url-title", async function (req, res) {
    try {
        const apiResponse = await api.getBlogPostByUrlTitle(req.query.urlTitle);
        res.json(apiResponse);
    } catch (err) {
        return {
            error: true
        }
    }
})

module.exports = app