const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/messageRoutes');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/allMessageUser', messageCtrl.getAllMessage);

router.post('/', messageCtrl.createMessage);

router.put('/:id', messageCtrl.modifyMessage);

//router.get('/:id', auth, messageCtrl.getOneMessage);

router.delete('/:id', messageCtrl.deleteMessage);



//router.post('/:id/like', auth, messageCtrl.likeMessage);

module.exports = router;