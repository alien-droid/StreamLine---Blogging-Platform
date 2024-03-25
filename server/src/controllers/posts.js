
import { Post, Comment } from '../models/post.js'
import fs from 'fs'

export async function addPost(req, res) {
    const { originalname, path } = req.file // saving the 'image' file
    const ps = originalname.split('.')
    const ext = ps[ps.length - 1]
    const newP = `${path}.${ext}`
    fs.renameSync(path, newP)

    const authorId = req.user._id
    const { title, summary, content, tags } = req.body
    const tagsArray = JSON.parse(tags)

    try {
        const post = new Post({ title, summary, content, tags: tagsArray, cover: newP, author: authorId })
        await post.save()

        return res.status(200).json(({ post }))
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

export async function editPost(req, res) {
    let newP = null
    if (req.file) {
        const { originalname, path } = req.file // saving the 'image' file
        const ps = originalname.split('.')
        const ext = ps[ps.length - 1]
        newP = `${path}.${ext}`
        fs.renameSync(path, newP)
    }
    const authorId = req.user._id
    const postId = req.params.postId

    const postD = await Post.findById(postId)
    if (!postD) {
        return res.json({ message: "Post not available" }).status(404)
    }
    const isAuthorSame = postD.author._id.toString() === authorId
    if (!isAuthorSame) {
        return res.status(400).json({ message: 'Not the correct author' })
    }

    const { title, summary, content, tags } = req.body
    const tagsArray = JSON.parse(tags)
    const updatedPost = await Post.findByIdAndUpdate(postId, { title, summary, content, tags: tagsArray, cover: newP ? newP : postD.cover })
    return res.status(200).json(({ updatedPost }))
    //res.json({ isAuthorSame })
}


export async function getPosts(req, res) {
    try {
        const posts = await Post.find()
            .populate('author', ['username', 'email'])
            .sort({ createdAt: 'desc' })
        res.json(posts).status(200)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Some error occured' })
    }
}

export async function getPost(req, res) {
    try {
        const post = await Post.findById(req.params.postId).populate('author', ['username', 'email']).populate('comments.author', ['username', 'email'])
        if (!post) {
            return res.json({ message: "Post not available" }).status(404)
        }
        res.json(post).status(200)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Some error occured' })
    }
}

export async function addComments(req, res) {
    const commenter = req.user._id

    const postId = req.params.postId
    const { content } = req.body
    try {
        const post = await Post.findById(postId)
        if (!post) {
            return res.json({ message: "Post not available" }).status(404)
        }
        const newComment = new Comment({ content, author: commenter })
        //await newComment.save()

        post.comments.push(newComment)
        await post.save()
        res.status(201).json({ message: "Comment added" })

    }
    catch (err) {
        console.log(err)
        res.json({ message: "Some error occured" }).status(500)
    }

}