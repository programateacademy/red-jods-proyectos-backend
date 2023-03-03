const mongoose = require('mongoose')

const ProjectScheme = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  axis: {
    type: [String],
    required: true 
  },
  category: {
    type: [String],
    required: true
  },
  ods: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  indicator: {
    type: String,
    required: true
  },
  objective: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  doc: {
    type: String,
  },
  task: [
    {
      name: {
        type: String,
        required: true
      },
      status: {
        type: Boolean,
        required: true
      }
    }], 
},

{
  timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('projects', ProjectScheme)
