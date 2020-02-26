import { Schema, model, Document } from 'mongoose'

interface TaskInterface extends Document {
  title: string,
  description: string,
  date: Date,
  completed: boolean,
}

const TaskSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default model<TaskInterface>('Task', TaskSchema)
