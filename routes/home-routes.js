const express = require('express');

const router = express.Router();
const authenticationChecker = require('../MiddleWare/authenticationChecker');
router.get('/welcome', authenticationChecker, (req, res)=>{
    return res.status(200).json({
        success:true,
        message:'home route reached!'
    })
})

module.exports = router;