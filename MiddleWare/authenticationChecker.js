const jwt = require('jsonwebtoken')

const authenticationChecker = (req, res, next)=>{

        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'Access token missing or invalid',
            });
        }
        try {
            const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
            console.log(decodedToken);
            req.userInfo = decodedToken;
            next()
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'something went wrong please login first'
            })
        }
};


module.exports = authenticationChecker;