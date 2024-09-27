import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import multer from 'multer';
import employeeModel from './dbModels/employeemodels.js';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })


const app = express();  
const upload = multer({ storage: storage })
app.use(express.json());
app.use(cors());
const port = 3000;

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentdate = `${day}-${monthNames[month - 1]}-${year}`;

mongoose.connect("mongodb://localhost:27017/dealsdray");


app.get("/getemp", async(req, res) => {
  try{
      const userdata = await employeeModel.find({});
      res.json(userdata)
  }
  catch(err) {
      console.log(err);
  }
})

app.post('/upload', upload.single('profile'), async(req, res)=>{
    try {
        const imagepath = req.file.path;

        const isexist = await employeeModel.findOne({Email:req.body.Email});
        if(isexist){
            return res.json({alreadyexist:true});
        }else{
          const emp = await employeeModel.create({
            UserName : req.body.UserName,
            Email : req.body.Email,
            MobileNo : req.body.MobileNo,
            Designation : req.body.Designation,
            Gender : req.body.Gender,
            empDate: currentdate,
            Course : req.body.Course,
            Image : `../server/${imagepath}`,
        })
        const data = res.json(emp);
        }
    } catch (err) {
        console.log(err);
    }
})

app.post('/update/:id', upload.single('profile'), async(req, res)=>{
  const {id} = req.params;
  console.log(id);
  try {
      const imagepath = req.file ? req.file.path : null;

      const deleteimg =await employeeModel.findById({_id:id});
      const delimg = deleteimg.Image;

      if(imagepath){
        fs.unlink(delimg, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      

      const checkemp = await employeeModel.findOne({Email:req.body.Email});
      if (checkemp && checkemp._id.toString() !== id) {
        return res.json({ alreadyexist: true });
      }else{
        const emp = await employeeModel.findByIdAndUpdate({_id:id},{
          UserName : req.body.UserName,
          Email : req.body.Email,
          MobileNo : req.body.MobileNo,
          Designation : req.body.Designation,
          Gender : req.body.Gender,
          empDate: currentdate,
          Course : req.body.Course,
          Image : imagepath ? `../server/${imagepath}` : delimg,
      },
      { new: true }
    )
      return res.json(emp);
      }
  } catch (err) {
      console.log(err);
  }
})

app.delete('/deleteemp/:id', async(req, res)=>{
  const {id} = req.params;
  console.log(id)
  try{
    const deleteimg =await employeeModel.findById({_id:id});
    const delimg = deleteimg.Image;
    console.log(delimg);

    fs.unlink(delimg, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Image deleted successfully');
    });

    const deleteuser = await employeeModel.findByIdAndDelete({_id:id});
    res.json(deleteuser);
  }catch(err){
    console.log(err);
  }
})

app.get('/editemp/:id', async(req, res)=>{
  const {id} = req.params;
  console.log(id);

  try{
    const employee = await employeeModel.findById(id);
    const empdata = res.json(employee);
  }catch(err){
    console.log(err);
  }
})

app.get('/search', async (req, res) => {
  const searchQuery = req.query.query || '';

  try {
    const results = await employeeModel.aggregate([
      {
        $match: {
          $or: [
            { UserName: { $regex: searchQuery, $options: 'i' }},
            { Designation: { $regex: searchQuery, $options: 'i' }},
            { Email: { $regex: searchQuery, $options: 'i' }}
          ]
        }
      },
      {
        $project: {
          UserName: 1, Email: 1, Designation: 1, MobileNo: 1, Gender: 1, Course: 1, empDate: 1, Image: 1
        }
      }
    ]);

    res.json(results);
  } catch (error) {
    console.error('Error during search:', error);
  }
});

// app.get('/id', async (req, res) => {
//     try {
//       let idcounter = await employeeModel.findOne();
//       if (!idcounter) {
//         idcounter = new employeeModel({ id: 0 });
//         await idcounter.save();
//       }
//       res.json(idcounter);
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   app.post('/id', async (req, res) => {
//     try {
//       let idcounter = await employeeModel.findOne();
//       if (!idcounter) {
//         ifcounter = new employeeModel({ id: req.body.id });
//       } else {
//         idcounter.id = req.body.id;
//       }
//       await idcounter.save();
//       res.json(idcounter);
//     } catch (err) {
//       console.log(err);
//     }
//   });

app.listen(port, () => {
    console.log(`the Server is started at port http://localhost:${port}`);
})