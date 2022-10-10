const router = require('express').Router();

const { UserSearchTags } = require('../Controller/Search')

router.get('/usersearches/getuserid/:uid/geteventid/:eventid' , UserSearchTags)

module.exports = router


