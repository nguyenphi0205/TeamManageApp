let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/projectTeamManageApp', { useCreateIndex: true }).then(() => {
    console.log('successful connection')
}).catch((err) => {
    console.error(err.stack)
})

let memberSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: Number
})
let projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        _id:false,
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'member'
        }
    }]
}, { strict: false })
module.exports.member = mongoose.model('member', memberSchema);
module.exports.project = mongoose.model('project', projectSchema);

