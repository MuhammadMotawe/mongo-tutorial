const mongoose = require('mongoose')

const Team = mongoose.Schema({
    team: {type:String, trim:true, default:''},
    city: {type:String, trim:true, default: ''}
})

module.exports = mongoose.model('Team', Team)