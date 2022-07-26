import mongoose from 'mongoose'

const Schema = mongoose.Schema

const timeSchema = new Schema({
  hours: Number,
  minutes: Number
}, {
  timestamps: true 
})

const hondeydoSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Profile"
  },
  tags: [{
    type: String
  }],
  task: {
    type: String, 
    required: true
  },
  estimatedTimeToComplete: {
    type: timeSchema, 
  },
  actualTimeToComplete: {
    type: timeSchema, 
  },
  finished: {
    type: Boolean, 
    default: false,
    required: true
  },
}, {
  timestamps: true
})

const Honeydo = mongoose.model('Honeydo', hondeydoSchema)

export {
  Honeydo
}