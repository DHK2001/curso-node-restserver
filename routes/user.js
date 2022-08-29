const {Router} = require('express');
const { usuaiosGet, 
        usuaiosPut, 
        usuaiosPost, 
        usuaiosDelete, 
        usuaiosPatch } = require('../controllers/user.controller');

const router = Router();

router.get('/', usuaiosGet);

router.put('/:id', usuaiosPut);

router.post('/', usuaiosPost);

router.delete('/', usuaiosDelete);

router.patch('/', usuaiosPatch);

module.exports= router;