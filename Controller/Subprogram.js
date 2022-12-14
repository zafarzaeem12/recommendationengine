const Subprogram = require('../Model/Subprogram')
const User = require('../Model/User')
const Search = require('../Model/Search')
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
    try{

        // User selected events start here
        const tagsearch = req?.query?.tagsearch;
        const recommeded = req?.params?.id;
        const userid = req?.params?.uid;
        const id = mongoose.Types.ObjectId(recommeded);
        const limit = req?.query?.limit || 10 ;
        const offset = req?.query?.offset || 1;
        const skip = (offset - 1) * limit;
    
        // filter by Program_id start here
        const onlyid = [];
        if (id === id) {
            const agg2 = [
                {
                  '$match': {
                    'ProgramCategory': id
                  }
                }, {
                  '$lookup': {
                    'from': 'programs', 
                    'localField': 'ProgramCategory', 
                    'foreignField': '_id', 
                    'as': 'results'
                  }
                }, {
                  '$unwind': {
                    'path': '$results'
                  }
                }, {
                  '$group': {
                    '_id': {
                      'ProgramCategory': '$ProgramCategory', 
                      'programName': '$programName', 
                      'status': '$status', 
                      'ProgramLocation': '$ProgramLocation.coordinates', 
                      'createdAt': '$createdAt', 
                      'results': '$results'
                    }
                  }
                }, {
                  '$facet': {
                    'data': [
                      {
                        '$skip': Number(skip)
                      }, {
                        '$limit': Number(limit)
                      }
                    ]
                  }
                }, {
                  '$unwind': {
                    'path': '$data'
                  }
                }, {
                  '$sort': {
                    'createdAt': -1
                  }
                }
              ]
            const datas = await Subprogram.aggregate(agg2);
            onlyid.push([datas]);
        }
        const databyid = onlyid.flat([2]).map((data) => data)
        // filter by Program_id end here

        // filter by Program_id && Program_name with regex start here
        const databysearch = [];
        if (id === id && tagsearch === tagsearch) {
            const agg = [
                {
                  '$match': {
                     $and:
                          [
                            {'ProgramCategory': id } ,
                            {'programName': { '$regex': `${tagsearch}` , '$options': 'i' }}
                ]
                  }
                }, {
                  '$lookup': {
                    'from': 'programs', 
                    'localField': 'ProgramCategory', 
                    'foreignField': '_id', 
                    'as': 'result'
                  }
                }, {
                  '$unwind': {
                    'path': '$result'
                  }
                }, {
                  '$group': {
                    '_id': {
                      'ProgramCategory': '$ProgramCategory', 
                      'programName': '$programName', 
                      'status': '$status', 
                      'ProgramLocation': '$ProgramLocation.coordinates', 
                      'createdAt': '$createdAt', 
                      'result': '$result'
                    }
                  }
                }, {
                  '$limit': 10
                }, {
                  '$sort': {
                    'createdAt': -1
                  }
                }
              ]
            const dataswithidandsearch = await Subprogram.aggregate(agg);
            databysearch.push([dataswithidandsearch])
        }
        const idandsearch = databysearch.flat([2].map((data) => data))
        // filter by Program_id && Program_name with regex end here
        
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
        const suggestion = await Subprogram.find(option)
        const fyp = [];
        fyp.push([suggestion, user]);
    
        const sugg = fyp.flat([2]).map((data) => data?.ProgramLocation?.coordinates === data?.Location?.coordinates ? null : data)
        sugg.pop();
        const pro = await Promise.all(["User-Selection", id && tagsearch ? ["User_selection_total", idandsearch.length, idandsearch] : ["User_selection_total", databyid.length, databyid], "Totol Suggestions", sugg?.length, "Suggestion", sugg, "CurrentUser", user])
        // Suggestion events end here
    
        if(!tagsearch){
            res.send({
                message: "Data Fetch Successfully",
                status: 200,
                data: pro
            })
        }
        else{
          const savedtag = new Search({
            search_Tag :   tagsearch,
            program_Id :   recommeded,
            user_Id    :   userid
          });

          const search = await savedtag.save();
            res.send({
              message: "Data Fetch Successfully",
              status: 200,
              data: {pro , search}
          })
        }
    } catch(err){
        res.send({
            message: "Data Not Found",
            status: 404
        })
    }

}

module.exports = {
    ProgramCreated,
    ProgramDetails,
    Recommendation
}