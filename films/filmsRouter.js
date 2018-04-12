const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {

      if (Object.keys(req.query).length > 0) {    // check if query object is empty or not
        let { producer, released } = req.query;

        if (!released) {    // if released is undefined, filter by producer
          const regex = new RegExp(producer, 'i');

          Film.find({})
              .where({ producer: regex })
              .sort({ episode: 'ascending' })
              .populate('characters', { name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1  })
              .populate('planets', { name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
              .then(films => {
                res.status(200).json(films);
              })
              .catch(err => {
                res.status(500).json(err);
              })
            } else {    // released is defined, filter by that instead
              const regex = new RegExp(released, 'i');

              Film.find({})
              .where({ release_date: regex })
              .sort({ episode: 'ascending' })
              .populate('characters', { name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1  })
              .populate('planets', { name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })

              .then(films => {
                res.status(200).json(films);
              })
              .catch(err => {
                res.status(500).json(err);
              })
            }
          } else {  // otherwise, grab all the films

        Film.find({})
        .sort({ episode: 'ascending' })
        .populate('characters', { name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1  })
        .populate('planets', { name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })

        .then(films => {
            res.status(200).json(films);
        })
        .catch(err => {
            res.status(500).json(err);
        })
      }
    });

router
    .route('/:id')
    .get((req, res) => {
      const id = req.params.id;

        Film.find({})
        .where({ key: `${id}` })
        .then(film => {
            res.status(200).json(film);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })

module.exports = router;
