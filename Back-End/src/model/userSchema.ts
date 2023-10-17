import { Schema, model } from "mongoose";

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,

    minlength: 6,
  },
  ProfilePic: {
    type: Array,
  },

  blockedStatus: {
    type: Boolean,
    default: false,
  },
  Mobile: {
    type: Number,
    required: true,
    unique: true,
  },
});

const User = model("UserSchema", userSchema);
export default User;
