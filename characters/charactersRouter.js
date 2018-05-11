const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here

router.get('/', (req, res, next) => {
    const { minheight } = req.query;
    Character.find({ gender: 'female', height: { $gt: minheight }})
        .then(FemaleHeightDes => res.send(FemaleHeightDes))
        .catch(err => next(err))
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Character.findById(id)
        .populate('homeworld', 'climate -_id')
        .then(char => {
            Film.find({characters: id})
                .select('title')
                .then(films => {
                    const character = {...char._doc, movies: films};
                    res.status(200).json(character);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id/vehicles', (req, res, next) => {
    Vehicle.find({ pilots: req.params.id })
        .populate('pilots', 'name')
        .select('vehicle_class')
        .then(vehicles => res.send(vehicles))
        .catch(err => next(err))
})


module.exports = router;
