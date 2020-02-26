import { Schema, model, Document } from 'mongoose'
import bcrypt from "bcrypt";

interface UserInterface extends Document {
  name: string,
  email: string,
  password: string,
  compareHash(password: string): boolean;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  
})

UserSchema.pre<UserInterface>("save", async function(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods.compareHash = async function (password: string) {
  const resp = await bcrypt.compare(password, this.password);  

  return resp;
}


export default model<UserInterface>('User', UserSchema)
