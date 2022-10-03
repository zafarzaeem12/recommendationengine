const Users = require('../Model/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register Api start here
const UserRegistration = async (req,res) => {
    try{
        const newUsers = new Users({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt( req.body.password ,process.env.SECRET_PASSWORD).toString(),
            status: req.body.status
    
        });
        console.log(newUsers)
        const savedUser = await newUsers.save()
        res.send({
            message:"User Created Successfully",
            status:200,
            data:savedUser,
        })
    }catch(error){
        res.send({
            message:"User Not Created",
            status:404,
        })
    }


}
// Register Api end here

// Login Api start here
const UserReservtion = async (req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email});
        const originalpassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASSWORD).toString(CryptoJS.enc.Utf8)
        if(!user){
            res.send({
                message:"Not Valid Email",
                status:404
            })
        }
        else if(originalpassword !== req.body.password){
            res.send({
                message:"Not Valid Password",
                status:404
            })
        }
        else {
            const access_token = jwt.sign(
                { 
                id: user._id,
                isAdmin: user.isAdmin 
                },process.env.JWT_TOKEN , { expiresIn:"20s" })

            const { password ,isAdmin,...detail} = user._doc
            res.send({
                message:"You are logged in Successfully",
                status:200,
                data:{...detail,access_token}
            })
        }     
    } catch(error){
        res.send({
            message:"Not Valid Credentails",
            status:500
        })
    }
}
// Login Api end here

// Get All users Api start here
const GetAllUser = async(req,res) => {
    const offset = req.query.offset;
    const limit = req.query.limit;
    const skip = (offset - 1) * limit;
    try{
        const totaldata = await User.countDocuments();
        const data = await User.find().limit(limit).skip(skip)
        res.send({
            total:data.length ? data.length : totaldata,
            message:"All Users Fetch Successfully",
            status:200,
            data:data,
        })

    }catch(err){
        res.send({
            message:"User Not Fetched",
            status:404,
            data:err
        })
    }

}
// Get All user Api end here
module.exports = {
    UserRegistration,
    UserReservtion ,
    GetAllUser
}