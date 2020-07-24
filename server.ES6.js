const express = require('express');
const path = require('path');
const db = require('./db/querys');
const bcrypt = require('bcrypt');
const compression = require('compression');

//constants
const saltRounds = 12;
const PORT = process.env.PORT || 5000;
const app = express();

//middleware
app.use(compression());
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

//routes

//login/signup authentication
app.post('/login', async (req, res) => {
  //query the db to get the user login information
  let userInfo = await db.getUser(req.body.username);
  //the selected user will be stored in rows[0]
  let user = userInfo.rows[0];
  //if user is undefined, no user exists, send error
  if (user === undefined) {
    res.status(404).send('Username does not exist');
  }
  //if user exists, compare the provided password with the hashed storage
  let match = await bcrypt.compare(req.body.password, user.password);
  //if the data matches, fetch the actual runner data and send it back to the client
  if (match) {
    let runnerInfo = await db.getRunner(user.id);
    res.status(202).send(runnerInfo);
  } else {
    //otherwise, send back incorrect password error
    res.status(401).send('Incorrect Password');
  }
});

app.post('/signup', async (req, res) => {
  //hash the password using bcrypt
  let hash = await bcrypt.hash(req.body.password, saltRounds);
  //attempt to create the user (if username exists, expect error)
  try {
    let id = await db.createUser(req.body, hash);
    let runnerId = await db.createRunner(id.rows[0].id, req.body);
    let runnerInfo = await db.getRunner(id.rows[0].id);
    res.status(200).send(runnerInfo);
  } catch (err) {
    console.log("Error creating User", err);
    res.sendStatus(500);
  }
});

app.post('/goal', async (req, res) => {
  try {
    let user = await db.setGoal(req.body.miles, req.body.id)
    res.status(200).send(user);
  } catch (err) {
    console.log("Error setting goal", err);
    res.sendStatus(500);
  }
});

//run CRD routes
app.post('/run', async (req, res) => {
  try {
    let runs = await db.createRun(req.body);
    res.status(200).send(runs.rows);
  } catch(err) {
    console.log('Error creating Run', err);
    res.sendStatus(500);
  }
})

app.delete('/run*', async (req, res) => {
  try {
    let runs = await db.deleteRun(req.query);
    res.status(200).send(runs.rows);
  } catch (err) {
    console.log('Error deleting Run', err);
    res.sendStatus(500);
  }
});

//team CR routes
// app.get('/teams', async (req, res) => {
//   try {
//     let teamData = await db.getTeams();
//     teamData = teamData.rows
//     res.status(200).send(teamData);
//   } catch (err) {
//     console.log('Error creating Team', err);
//     res.sendStatus(500);
//   }
// });

app.post('/join', async (req, res) => {
  try {
    let teamData = await db.joinTeam(req.body);
    res.status(200).send(teamData);
  } catch (err) {
    console.log('Error joining Team', err);
    res.sendStatus(500);
  }
})

app.post('/teams', async (req, res) => {
  try {
    let teamData = await db.createTeam(req.body);
    res.status(200).send(teamData);
  } catch (err) {
    console.log('Error creating Team', err);
    res.sendStatus(500);
  }
});


//listen
app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});