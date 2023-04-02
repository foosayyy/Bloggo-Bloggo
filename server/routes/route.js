import express from 'express';

import {signupUser, loginUser} from "../controller/user-controller.js";

const router = express.Router();

// '/signup user is an endpoint and the signupUser is an API that will be called when we hit this signup end point

router.post('/signup' , signupUser);
router.post('/login' , loginUser);

export default router;