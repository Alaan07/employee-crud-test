import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// mongoose.connect("mongodb://localhost:27017/(ur db name)");

app.listen(port, () => {
    console.log(`the Server is started at port http://localhost:${port}`);
})