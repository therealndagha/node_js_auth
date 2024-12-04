

const accessControl = (req, res, next) =>{
    const userInfo = req.userInfo;
    if(userInfo.role === 'admin'){
        return next()
    }

    return res.status(500).json({
        success:false,
        message:'you need to be an admin to access this route.'
    })
};

module.exports = accessControl;