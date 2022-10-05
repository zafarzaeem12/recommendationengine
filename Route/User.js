const router = require('express').Router();
const { UserRegistration , UserLogin ,GetAllUser} = require('../Controller/User')

router.post('/register' , UserRegistration);
router.post('/login', UserLogin );
router.get('/',GetAllUser);


module.exports = router;