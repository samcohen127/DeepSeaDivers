const Dive = require('../models/dive.model')


module.exports = {
    getAllDives: (req, res) => {
        Dive.find()
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    },
    getOneDive: (req, res) => {
        Dive.findById(req.params.id)
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    },
    addDive: (req, res) => {
        Dive.create(req.body)
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    },
    updateDive: (req, res) => {
        Dive.updateOne({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    },

    deleteDive: (req, res) => {
        Dive.remove({ _id: req.params.id })
            .then((result) => {
                res.json(result)
            }).catch((err) => {
                res.status(400).json(err)
            })
    }
}