import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
     ID : {type : Number},
    UserName : {type: String, required: true},
    Email : {type: String, required: true},
    MobileNo : {type: Number, required: true},
    Designation : {type: String, required: true},
    Gender : {type: String, required: true},
    Course : {type: String, required: true},
    empDate:{type:String},
    Image : {type: String, required: true},
});

employeeSchema.index({ UserName: 'text', Email: 'text', Designation: 'text'});

const employeeModel = mongoose.model("employeelists", employeeSchema);

export default employeeModel;