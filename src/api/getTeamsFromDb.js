function getTeamsFromDb(req, res) {
  const db = req.db.db('football-draw-react-node');
  db.collection('teams').find().limit(128).toArray(function (err, data) {
    if (err) res.send('Error:' + err);
    // TODO: prepare 32 teams here!
    const finalTeams = []
    res.send(finalTeams);
  });
}

module.exports = getTeamsFromDb;
