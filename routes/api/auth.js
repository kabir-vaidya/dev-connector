const router = require('express').Router();


// @desc        Test Route
// @route       GET         api/users
// @access      PUBLIC
router.get("/", (req,res) => res.send('Auth Route'));


module.exports = router;