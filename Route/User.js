const router = require('express').Router();
const { UserRegistration , UserReservtion ,GetAllUser} = require('../Controller/User')

router.post('/register' , UserRegistration);
router.post('/login', UserReservtion );
router.get('/',GetAllUser);


module.exports = router;