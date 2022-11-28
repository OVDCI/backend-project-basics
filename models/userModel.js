import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true,"First-name required and length minimum 3 character"],
    trim: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: [true,"Last-name required and length minimum 3 character"],
    trim: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true,"Email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true,"Password required and length minimum 6"],
    minLength:6,
  }
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
