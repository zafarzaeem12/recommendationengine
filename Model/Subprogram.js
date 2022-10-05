const mongoose = require("mongoose");

const SubProgramSchema = new mongoose.Schema(
  {
    programName:{
        type:String
    },
    ProgramCategory:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Program'  
    },
    ProgramLocation: {
      type: {
        type: String,
        enum: ['Point', 'Polygon']
      },
      coordinates: [Number] 
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subprogram", SubProgramSchema);
