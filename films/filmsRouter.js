const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router 
    .route('/')
    .get((req, res) => {
        Film.find()
            .then(film => res.json(film))
            .catch(err => sendUserError(500, err.message, res))
    })

router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            Film.findById(id)
                .populate('characters', { _id: 1, name: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1 })
                .populate('planets', { name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
                .populate('species')
                .populate('starships')
                .populate('vehicles')
                .then(foundFilm => {
                    res.json(foundFilm);
                })
                .catch(err => sendUserError(500, err.message, res))
        })

router
    .route('/:id/characters')
        .get((req, res) => {
            const { id } = req.params;
            const { characterID } = req.body;
            Film.findById(id)
                .then(foundFilm => {
                    foundFilm.characters = Object.assign({}, foundFilm.characters, characterID)
                    foundFilm.save()
                        .then(savedFilm => res.status(201).json(savedFilm))
                        .catch(err => sendUserError(500, err.message, res))
                })
                .catch(err => sendUserError(500, err.message, res))
        })
router
    .route('/:id/planets')
        .get((req, res) => {
            const { id } = req.params;
            const { planetID } = req.body;
            Film.findById(id)
                .then(foundFilm => {
                    foundFilm.planets = Object.assign({}, foundFilm.planets, planetID)
                    foundFilm.save()
                        .then(savedFilm => res.status(201).json(savedFilm))
                        .catch(err => sendUserError(500, err.message, res))
                })
                .catch(err => sendUserError(500, err.message, res))
        })

module.exports = router;
