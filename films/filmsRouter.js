const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// get all list of films 1-orderBy episodes
router
    .route('/')
    .get((req, res) => {
        if (req.query.producer) {

            Film.find({ producer: { "$regex": req.query.producer, "$options": "i" } })

                .then(response => {
                    res.status(200).json({ data: response })
                })
                .catch(err => res.status(500).json({ data: err }))
        }
        else if (req.query.release) {

            Film.find({ release_date: { "$regex": req.query.release, "$options": "i" } })

                .then(response => {
                    res.status(200).json({ data: response })
                })
                .catch(err => res.status(500).json({ data: err }))

        }
        else {

            Film.find({})
                .sort('episode')
                .populate('characters', 'name gender height skin_color hair_color eye_color')
                .populate('planets', 'name climate terrain gravity diameter')
                .then(response => {
                    res.status(200).json({ data: response })
                })
                .catch(err => res.status(500).json({ data: err }))
        }
    })

module.exports = router;
