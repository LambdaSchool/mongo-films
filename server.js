const express = require('express');
const helmet = require('helmet');

const db = require('./data/db.js');
const charactersRouter = require('./characters/charactersRouter.js');
const filmsRouter = require('./films/filmsRouter.js');
const speciesRouter = require('./species/speciesRouter.js');
const starshipsRouter = require('./starships/starshipsRouter.js');
const vehiclesRouter = require('./vehicles/vehiclesRouter.js');
const planetsRouter = require('./planets/planetsRouter.js');

const server = express();

db
  .connectTo('starwars')
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.use(helmet());
server.use(express.json());

server.use('/characters', charactersRouter);
server.use('/films', filmsRouter);
server.use('/species', speciesRouter);
server.use('/starships', starshipsRouter);
server.use('/vehicles', vehiclesRouter);
server.use('/planets', planetsRouter);

server.get('/', (req, res) => res.send('API Running...'));

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n\nAPI running on http://localhost:${port}`)
);
