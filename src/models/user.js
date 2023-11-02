
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  nif: Number,
  password: String,
  role: String,
});

const user = mongoose.model.user || mongoose.model("User", UserSchema);

export default user;
