const mongoose =require("mongoose")
const mySchema = mongoose.Schema({
    site :String,
    uname :String,
    password :String
})
const passModel =mongoose.model("PasswordColl",mySchema)
module.exports= passModel;