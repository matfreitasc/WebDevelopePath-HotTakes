const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceControler = require('../controllers/sauces');


router.get('/', sauceControler.getAllSauces);
router.post('/', auth, multer, sauceControler.createSauce);

router.get('/:id', auth, sauceControler.getOneSauce);
router.put('/:id', auth, multer, sauceControler.editSauce);
router.delete('/:id', sauceControler.deleteSauce);

router.post('/:id/like', auth, sauceControler.likeSauce);

module.exports = router;
