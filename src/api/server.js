const express = require('express');
const fetchAndSaveTeams = require('./fetchSaveTeams');
const getTeamsFromDb = require('./getTeamsFromDb');
const expressMongoDb = require('express-mongo-db');

const app = express();
app.use(expressMongoDb('mongodb+srv://root:root@football-draw-react-node-7pei7.mongodb.net/test?retryWrites=true'));

app.get('/', getTeamsFromDb);
app.get('/fetch-teams', fetchAndSaveTeams);

app.listen(3000, () =>
    console.log(`Example app listening on port 3000!`),
);
