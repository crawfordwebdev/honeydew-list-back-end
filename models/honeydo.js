import mongoose from 'mongoose'

const Schema = mongoose.Schema

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
    type: Number,
    minimum: 0
  },
  actualTimeToComplete: {
    type: Number, 
    minimum: 0
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