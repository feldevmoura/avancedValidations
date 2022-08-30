const path = require('path');
const multer = require('multer');
const { check } = require('express-validator');

const validations = [

  check('name')
    .notEmpty().withMessage('Tem de escrever um nome').bail()
    .trim(),

  check('email')
    .notEmpty().withMessage('Tem de escrever um email').bail()
    .trim().bail()
    .normalizeEmail().bail()
    .isEmail().withMessage('Digite um formato de email correto'),

  check('psw')
    .notEmpty().withMessage('Tem de escrever uma senha').bail()
    .isLength({ min: 6 }).withMessage('A senha precisa ter 6 caracteres').bail()
    .trim(),
  
  check('avatar').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.gif']

    if(!file) {
      throw new Error('Precisa escolher um arquivo')
    } else {
      let fileExtension  = path.extname(file.originalname);

      if(!acceptedExtensions.includes(fileExtension)) {
        throw new Error(`As extenções de arquivo permitidas são ${acceptedExtensions.join(', ')}`)
      }
    }

    return true;
  })

];

module.exports = validations;