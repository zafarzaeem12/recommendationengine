const Subprogram = require('../Model/Subprogram')
const User = require('../Model/User')
var mongoose = require('mongoose');

const ProgramCreated = async (req, res) => {
    try {
        const programs = new Subprogram({
            programName: req.body.programName,
            ProgramCategory: req.body.ProgramCategory,
            ProgramLocation: req.body.ProgramLocation,
            status: req.body.status
        })

        const differentprogram = await programs.save();

        res.send({
            message: "Program Created Successfully",
            status: 201,
            data: differentprogram
        })
    } catch (err) {
        res.send({
            message: "Program Not Created",
            status: 404
        })
    }
}

const ProgramDetails = async (req, res) => {
    try {
        const programs = await Subprogram.find();
        res.send({
            message: "Program Fetch Successfully",
            status: 201,
            data: programs
        })

    } catch (err) {
        res.send({
            message: "Program Not Fetch",
            status: 404
        })


    }

}

const Recommendation = async (req, res) => {
    // User selected events start here
    const recommeded = req.params.id;
    const tagsearch = req.query.tagsearch;
    const userid = req.params.uid;
    var id = mongoose.Types.ObjectId(recommeded);


    const agg = [
        {
            '$match': {
                'ProgramCategory': id
            }
        }, {
            '$lookup': {
                'from': 'programs',
                'localField': 'ProgramCategory',
                'foreignField': '_id',
                'as': 'result'
            }
        }, {
            '$sort': {
                'createdAt': -1
            }
        }
    ];

    // const datas = await Subprogram.aggregate(agg);
    const datas = await Subprogram.find({ $or : [{ ProgramCategory : id } ,{ programName : tagsearch }] }).populate('ProgramCategory')
    // User selected events end here

    // Suggestion events start here
    const user = await User.find({ _id: userid })
    const option = {
        ProgramLocation: {
            $geoWithin: {
                $centerSphere: [user[0]?.Location?.coordinates, 15 / 3963.2]
            }
        }

    }
    const suggestion = await Subprogram.find(option);
    const fyp = [];
    fyp.push([suggestion, user]);

    const sugg = fyp.flat([2]).map((data) => data?.ProgramLocation?.coordinates === data?.Location?.coordinates ? null : data)
    sugg.pop();
    const pro = await Promise.all(["total", datas?.length, "User-Selection", datas, "Totol Suggestions", sugg?.length, "Suggestion", sugg, "CurrentUser", user])
    // Suggestion events end here

    res.send({
        message: "Data Fetch Successfully",
        status: 200,
        data: pro
    })

}

module.exports = {
    ProgramCreated,
    ProgramDetails,
    Recommendation
}