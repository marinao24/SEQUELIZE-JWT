const express = require('express');
const router = express.Router();
const controller = require('../controllers/PostController');
const auth = require('../middlewares/auth');
const postPolicy = require('../policies/PostPolicy');
router.get('/api/posts',auth, controller.list);
router.post('/api/post/', auth, controller.create);
router.put('/api/post/:id', auth, controller.find, postPolicy.update, controller.update);
router.get('/api/post/:id', auth, controller.find, postPolicy.show, controller.show);
router.delete('/api/post/:id', auth, controller.find, postPolicy.delete, controller.delete);

module.exports = router;
