const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema({
    fname : {
        type:String,
       // required:true
    },
    email: {
        type:String,
       // required:true
    },
    password:  {
        type:String,
      //  required:true
    },
    confirmpassword : {
        type:String,
      //  required:true
    }
});

//new collection
const Register = new mongoose.model("Resgister", touristSchema);

module.exports = Register;