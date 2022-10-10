const Search = require('../Model/Search');

const UserSearchTags = async (req,res,next) => {
  try{  
    const userId = req?.params?.uid;
    const eventId = req?.params?.eventid;

    const GetAllUserTags  = await Search.find({ $and: [{ user_Id : userId } , { program_Id : eventId }] });
    res.send({
        total: GetAllUserTags.length,
        message:"Search Tag Found",
        status:200,
        data: GetAllUserTags
    })

} catch(err){
    res.send({
        message:"No Search Tag Found",
        status:404
    })
}
   

}

module.exports = {
    UserSearchTags
}