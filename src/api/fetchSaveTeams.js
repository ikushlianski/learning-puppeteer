const fetchTeams = require('./scrapper');

const fetchAndSaveTeams = async (req, res) => {
  const teams = await fetchTeams();
  const db = req.db.db('football-draw-react-node');
  db.collection('clubs').insert(teams, function (err, data) {
    if (err) {
      res.send('Error:' + err);
    }

    res.send('Successfully inserted')
  });
};

module.exports = fetchAndSaveTeams;
