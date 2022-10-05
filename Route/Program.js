const router = require('express').Router();

const { ProgramCreated , GetAllPrograms ,  } = require('../Controller/Program')

router.post('/create' , ProgramCreated);
router.get('/get' , GetAllPrograms );


module.exports = router