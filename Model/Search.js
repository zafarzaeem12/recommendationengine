const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema(
  {
    search_Tag:{
        type:String ,
        required: true,
    },
    program_Id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Program'  
    },
    user_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Search", SearchSchema);
