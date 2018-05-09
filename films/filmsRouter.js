const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Film.find({})
        .sort('episode')
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
        .then(films => {
            res.status(200).json(films);
        })
        .catch(err => {
            res.status(500).json({ error: 'Films could not be retrieved'})
        })
    })

router
    .route('/:id')
    .get((req, res) => {
      Film.findById(req.params.id)
        .populate('characters')
        .then(films => {
          res.status(200).json(films);
        })
        .catch(err => {
          res.status(500).json({errorMessage: 'The film information could not be retrieved.'})
        })
      })


module.exports = router;
