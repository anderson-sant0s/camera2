// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
// }

// const UserSchema: Schema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IUser>("User", UserSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// handle hot-reload / multiple model compile issues
const User =
  (mongoose.models && (mongoose.models.User as any)) ||
  mongoose.model("User", userSchema);
export default User;
