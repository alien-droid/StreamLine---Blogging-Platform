import express from 'express'
import { verifyJWT } from '../actions/index.js'

import { addComments, addPost, editPost, getPost, getPosts } from '../controllers/posts.js'
import multer from 'multer'

const upload = multer({ dest: 'src/uploads/', limits: { fieldSize: 1024 * 1024 * 25 } })

const router = express.Router()

router.get('/posts', getPosts)
router.post('/post', verifyJWT, upload.single('file') , addPost)
router.put('/post/:postId', verifyJWT, upload.single('file') , editPost)

router.get('/post/:postId', getPost)
router.post('/post/:postId/comment', verifyJWT, addComments)

export default router

