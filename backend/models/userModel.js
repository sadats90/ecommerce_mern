import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );
 
userSchema.methods.matchPassword = async function(enteredPassword) {

    return await bcrypt.compare(enteredPassword,this.password)

}


userSchema.pre('save',async function (next) {
  if(!this.isModified('password'))
  {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt) // this referes to the user, it is used in mongoose model and before saving.


}) // .pre allows to do something before its saved in the db


const User = mongoose.model("User",userSchema)

export default User