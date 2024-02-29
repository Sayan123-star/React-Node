// initialising express and used for initialising router
const express = require('express');
const router = express.Router();
// initialising a middleware function to verify the token of user 
const protectedroute = require('../middleware/protectresource.js');
// connecting the controllers with the routers
const { createnew, allposts, loggedposts, deletepost } = require('../controller/post.controller.js');

router.get('/allposts', allposts)
router.get('/loggedposts', protectedroute, loggedposts)
router.post('/createpost', protectedroute, createnew)
router.delete('/deletepost/:postId', protectedroute, deletepost)

module.exports = router;