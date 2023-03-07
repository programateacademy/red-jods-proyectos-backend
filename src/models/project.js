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
    type: String,
    required: true 
  },
  category: {
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
