const router = require('express').Router();

const { ProgramCreated , ProgramDetails  ,Recommendation} = require('../Controller/Subprogram')

router.post('/create' , ProgramCreated);
router.get('/getprogramsdetails' , ProgramDetails)
router.get('/get_recommended_engine/get_userid/:uid/get_subprogram_id/:id' , Recommendation);
module.exports = router


