const express = require('express');

const router = express.Router();
const authenticationChecker = require('../MiddleWare/authenticationChecker');
const accessControl = require('../MiddleWare/accessControl');
const {changeUserRole, deleteUser} = require('../controllers/admin-controllers');
router.get('/welcome', authenticationChecker, accessControl, (req, res)=>{
    return res.status(200).json({
        success:true,
        message:'admin route reached!'
    })
});

router.put('/update/:id', authenticationChecker, accessControl, changeUserRole);

router.delete('/delete/:id', authenticationChecker, accessControl, deleteUser);

module.exports = router;