import mongoose from "mongoose";

const employeSchema = new mongoose.Schema({
    // id : {type : Number, required: true},
    UserName : {type: String, required: true},
    Email : {type: String, required: true},
    MobileNo : {type: Number, required: true},
    Designation : {type: String, required: true},
    Gender : {type: String, required: true},
    Course : {type: String, required: true},
    empDate:{type:String},
    Image : {type: String, required: true},
});

const employeeModel = mongoose.model("employeelists", employeSchema);

export default employeeModel;