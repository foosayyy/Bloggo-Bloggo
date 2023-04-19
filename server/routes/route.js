import express from 'express';

import {signupUser, loginUser} from "../controller/user-controller.js";
import { uploadImage, getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';
import { createPost , getAllPosts , getPost, updatePost , deletePost} from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';

const router = express.Router();

// '/signup user is an endpoint and the signupUser is an API that will be called when we hit this signup end point

router.post('/signup' , signupUser);
router.post('/login' , loginUser);
router.post('/file/upload' ,upload.single('file'), uploadImage);

router.get('/file/:filename' , getImage);
router.post('/create' , authenticateToken, createPost);
router.get('/posts' , authenticateToken, getAllPosts);
router.get('/post/:id' , authenticateToken , getPost);
router.put('/update/:id', authenticateToken , updatePost);
router.delete('/delete/:id' , authenticateToken , deletePost)

export default router;