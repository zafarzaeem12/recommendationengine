const Program = require('../Model/Program')
const User = require('../Model/User');
const ProgramCreated = async (req,res) => {
   try{ 
    const programs = new Program({
        programName : req.body.programName,
        status: req.body.status
    })

    const differentprogram = await programs.save();

    res.send({
        message:"Program Created Successfully",
        status:201,
        data: differentprogram
    })
} catch(err){
    res.send({
        message:"Program Not Created",
        status:404
    })
}
}

const GetAllPrograms = async (req ,res) => {
    const programs = await Program.find();
    res.send({
        message:"Program Fetch Successfully",
        status:201,
        data: programs
    })
}




module.exports = {
    ProgramCreated,
    GetAllPrograms,
}