const User = require('../Models/User')

const changeUserRole = async(req, res)=>{
    try {
        //lets get id from frontend 
        const userId = req.params.id;
        const userTobeUpdated = await User.findById(userId);
        //lets check if this usere exists 
        if(!userTobeUpdated){
            return res.status(400).json({
                success:false,
                message:'user not found, incorrect id'
            })
        }
        //lets update the user role if this user exists
        const newRole = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, {role: newRole.role}, {new: true});
        if(updatedUser){
            return res.status(201).json({
                success:true,
                message: 'updated user role successfully',
                data: updatedUser
            })
        }

        return res.status(400).json({
            success:false,
            message:'something went wrong, incorrect format of new role'
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong . please try again later. '
        })
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Attempt to delete the user
        const userTobeDeleted = await User.findByIdAndDelete(userId);

        // Check if the user was found and deleted
        if (!userTobeDeleted) {
            return res.status(404).json({
                success: false,
                message: 'User not found, cannot delete',
            });
        }

        // Respond with success
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
};



module.exports = {changeUserRole, deleteUser};