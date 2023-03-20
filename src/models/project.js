const mongoose = require('mongoose')

const ProjectScheme = new mongoose.Schema({
  emailUser: {
    type: String,
    required: true,
    ref:'user'
  },
  title: {
    type: String,
    required: true
  },
  axis: {
    type: String,
    required: true 
  },
  ods:  [
    {
      url: {
        type: String,
        required: true
      },
      nameOds: {
        type: String,
        required: true
      }
    }],
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
  doc: {
    type: String,
  },
  task: [
    {
      name: {
        type: String,
        required: true
      },
      state: {
        type: Boolean,
        required: true
      }
    }], 
    state:{
      type: Boolean,
      default: false
    },
},

{
  timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('projects', ProjectScheme)
