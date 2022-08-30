const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { check } = require('express-validator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/avatars')
  },
  filename: (req, file, cb) => {
    let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
})

const uploadFile = multer({ storage });

const userController = require('../controllers/userController');

const validations = require('../middlewares/validations')

router.get('/', userController.register);

router.post('/', uploadFile.single('avatar'),validations, userController.processRegister);

module.exports = router;