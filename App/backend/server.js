const express = require('express')
const mongoose =require("mongoose")
const passModel = require("./model")
const cors =require("cors");

const app = express()

app.use(express.json());

app.use(cors());
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/passOP');

app.get('/',async (req, res) => {
    const data = await passModel.find()
  res.send(data)
})

app.post('/',async (req, res) => {
  console.log(req.body,"this is the LOGGGGG")
  try {
    const passWD = new passModel(req.body)
  const saveData=await passWD.save()
  console.log("Saved successfully:", saveData);
  res.status(201).json(saveData)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving password" });
  }
    
})

app.delete('/:id',async (req, res) => {
  try {
    const data = await passModel.findByIdAndDelete(req.params.id)
  res.status(201).json({message:"Data has been deleted"})
  } catch (error) {
    res.status(500).json({message:"Error deleting"})
  }
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})