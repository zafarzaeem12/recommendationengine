const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
  {
    programName:{
        type:String,
        require:true,
        unique:true
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", ProgramSchema);
