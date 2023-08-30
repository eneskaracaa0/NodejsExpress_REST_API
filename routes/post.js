import express from 'express';
import { getPosts,createPost,getDetail,getUpdate,deletePost } from '../controllers/post.js';
import auth from '../middleware/auth.js';

const router=express();

router.get('/getPosts',getPosts);
router.post('/createPost',auth,createPost);
router.get('/getDetail/:id',getDetail);
router.patch('/getUpdate/:id',auth,getUpdate);
router.delete('/deletePost/:id',auth,deletePost);

export default router