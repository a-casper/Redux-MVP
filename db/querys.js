const { Pool } =require('pg');

const pool = new Pool({
  user: 'anthony.casper',
  host: 'localhost',
  database: 'runAcross',
  password: 'hackreactor',
  port: 5432
});

pool.on('error', (err, client) => {
  console.log("Unexpected Error on idle client", err);
  process.exit(-1);
});

;(async () => {
  const client = await pool.connect();
  console.log("Connected to postgres client")

  client.release();
})().catch(err => console.log(err.stack));

/*//////////////////////////////////////////
  USER TABLE INTERACTIONS
//////////////////////////////////////////*/
//fetch a users login information from the database
pool.getUser = async (userName) => {
  try {
    let user = await pool.query(`SELECT * FROM users WHERE "username"=$1`, [userName]);
    return user;
  } catch (err) {
    console.log('Error retrieving user from DB', err);
  }
};

//create a new user
pool.createUser = async (signUpInfo, hash) => {
  try {
    let result = await pool.query(`INSERT INTO users("username", "password")  VALUES ($1, $2) RETURNING id`, [signUpInfo.username, hash]);
    return result;
  } catch (err) {
    console.log('Error adding user to DB', err)
  }
};

/*//////////////////////////////////////////
  RUNNERS TABLE INTERACTIONS
//////////////////////////////////////////*/
//get all individual runner info
pool.getRunner = async (userId) => {
  try {
    //fetch the runner information
    let runner = await pool.query(`SELECT * FROM runners WHERE "userId"=$1`, [userId]);
    runner = runner.rows[0];
    //using the runnerId, get all associated runs
    let runs = await pool.query(`SELECT miles, time, "runDate" from runs WHERE "runnerId"=${runner.id} ORDER BY "runDate" DESC`);
    //get the runners team information if the runner is on a team
    let team = null;
    if(runner.teamId !== null) {
      team = await pool.query(`SELECT name, charity, goal from teams WHERE "id=${runner.teamId}"`);
    }
    return [runner, runs.rows, team];
  } catch (err) {
    console.log('Error retrieving runner information from DB', err)
  }
};

/*//////////////////////////////////////////
  RUNS TABLE INTERACTIONS
//////////////////////////////////////////*/

/*//////////////////////////////////////////
  TEAM TABLE INTERACTIONS
//////////////////////////////////////////*/