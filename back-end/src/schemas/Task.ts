import { Schema, model, Document } from 'mongoose'

interface TaskInterface extends Document {
  title: string,
  description: string,
  date: Date,
  completed: boolean,
  user: Schema.Types.ObjectId
}

const TaskSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
})

export default model<TaskInterface>('Task', TaskSchema)
