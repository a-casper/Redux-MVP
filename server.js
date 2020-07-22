const express = require('express');
const path = require('path');
const db = require('./db/querys');
const bcrypt = require('bcrypt');

//constants
const saltRounds = 12;
const PORT = process.env.PORT || 5000;
const app = express();

//middleware
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
  let hash = bcrypt.hash(req.body.password, saltRounds);
  //attempt to create the user (if username exists, expect error)
  try {
    let id = await db.createUser(req.body, hash);
    let runnerInfo = await db.getRunner(id);
    res.status(200).send(runnerInfo);
  } catch (err) {
    console.log("Error creating User", err);
    res.sendStatus(500);
  }
});

//run CRUD routes

//team CR routes


//listen
app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});