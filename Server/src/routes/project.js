let DataModel = require('../model/data.model')
let express = require('express')
let router = express.Router();

//POST project
router.post('/createProject', (req, res) => {
    if (!req.body) {
        return res.status(400).send('request body is missing');
    }

    let projectModel = new DataModel.project(req.body)
    projectModel.save().then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc)
        }
        res.status(200).send(doc);
    }).catch((err) => {
        res.status(500).json(err)
    })
})
//GET project
router.get('/getProject', (req, res) => {
    DataModel.project.find().populate('members.member').then(doc => {
        res.json(doc)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

//add newMember
router.put('/addNewMember', (req, res) => {
    // if (!req.body._id) {
    //     res.status(400).send('missing URL parametter :id')
    // }
    // res.send(req.params)
    // var member = { firstName: req.body.members };
  
    DataModel.project.findOneAndUpdate(
        { _id: req.query._id },
        {$push :{members:{$each: [{member:req.body.members[0].member}]}}},
        { "upsert": true, "new": true },
    ).then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json(err)
    })

});

module.exports = router;