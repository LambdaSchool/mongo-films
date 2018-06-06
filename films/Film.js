const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Film = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  episode: Number,
  edited: { type: Date, default: Date.now },
  planet_ids: [Number],
  producer: String,
  title: { type: String, required: true },
  director: String,
  release_date: String,
  opening_crawl: String,
  character_ids: [Number],
  specie_ids: [Number],
  key: { type: Number, unique: true },
  starship_ids: [Number],
  vehicle_ids: [Number],
  starship: [{ type: ObjectId, ref: 'Starship' }],
  vehicles: [{ type: ObjectId, ref: 'Vehicle' }],
  planets: [{ type: ObjectId, ref: 'Planets' }],
  characters: [{ type: ObjectId, ref: 'Characters' }],
  species: [{ type: ObjectId, ref: 'Species' }],
  // add fields for starships, vehicles, planets, characters and species
  // to link them to the corresponding model
});

module.exports = mongoose.model('Film', Film);
