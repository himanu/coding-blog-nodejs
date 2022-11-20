const BlogPostModel = require("../models/post.js")
const moment = require("moment");
const showdown = require("showdown");

module.exports = {
    // FUNCTIONS WILL GO HERE
    getAllBlogPosts: async() => {
        const now = moment().unix()
        const posts = await BlogPostModel.find({ dateTimestamp: { $lte: now } }, "title urlTitle dateTimestamp tags thumbnailImageUrl")
            .sort({ dateTimestamp: -1 })
            .exec();
        return {
            success: true,
            posts: posts
        };
    },
    getBlogPostsByTag: async(tag) => {
        const now = moment().unix()
        const posts = await BlogPostModel.find({ tags: tag, dateTimestamp: { $lte: now } }, "title urlTitle dateTimestamp tags thumbnailImageUrl")
            .sort({ dateTimestamp: -1 })
            .exec();
        return {
            success: true,
            posts: posts
        };
    },
    getFiveNewestPosts: async () => {
        const now = moment().unix()
        const posts = await BlogPostModel.find({dateTimestamp: {$lte: now}}, "title urlTitle dateTimestamp tags thumbnailImageUrl")
            .sort({dateTimestamp: -1})
            .limit(5)
            .exec();
        return {
            success: true,
            posts: posts
        };
    },
    getBlogPostByUrlTitle: async (urlTitle) => {
        const post = await BlogPostModel.findOne({urlTitle: urlTitle}).exec();
        if(!post) {
            return {
                notFoundError: true
            }
        }
        console.log("psot ", post)
        const markdownConverter = new showdown.Converter();
        post.markdownContent = markdownConverter.makeHtml(post.markdownContent);
        return {
            success: true,
            post: post
        }
    }
}