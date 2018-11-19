let DataModel = require('../model/data.model')
let express = require('express')
let router = express.Router();

//POST member
router.post('/createMember', (req, res) => {
    if (!req.body) {
        return res.status(400).send('request body is missing');
    }
    let memberModel = new DataModel.member(req.body)
    memberModel.save().then(doc => {
        if (!doc || doc.length === 0) {
            return res.status(500).send(doc)
        }
        res.status(200).send(doc);
    }).catch((err) => {
        res.status(500).json(err)
    })
})
//GET member
router.get('/getMember', (req, res) => {
    DataModel.member.find().then(doc => {
        res.json(doc)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

module.exports = router;