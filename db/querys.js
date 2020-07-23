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
    //console.log(runner);
    //using the runnerId, get all associated runs
    let runs = await pool.query(`SELECT id, miles, time, "runDate" from runs WHERE "runnerId"=${runner.id} ORDER BY "runDate" DESC`);
    //get the runners team information if the runner is on a team
    let team = null;
    //console.log(runner.teamid)
    if(runner.teamid !== null) {
      team = await pool.query(`SELECT name, charity, goal from teams WHERE id=${runner.teamid}`);
    }
    return {
      runner,
      runs: runs.rows,
      team: team
    };
  } catch (err) {
    console.log('Error retrieving runner information from DB', err)
  }
};

/*//////////////////////////////////////////
  RUNS TABLE INTERACTIONS
//////////////////////////////////////////*/

pool.createRun = async ({miles, time, id, date}) => {
  try {
    await pool.query(`INSERT INTO runs("runnerId", "miles", "time", "runDate") VALUES ($1, $2, $3, $4)`, [id, miles, time, date]);
    let runs = await pool.query(`SELECT id, miles, time, "runDate" from runs WHERE "runnerId"=${id} ORDER BY "runDate" DESC`);
    return runs;
  } catch(err) {
    console.log('Error inserting run into DB', err);
  }
}

pool.deleteRun = async ({id, runnerId}) => {
  try {
    await pool.query(`DELETE FROM runs WHERE id=${id}`);
    let runs = await pool.query(`SELECT id, miles, time, "runDate" from runs WHERE "runnerId"=${runnerId} ORDER BY "runDate" DESC`);
    return runs;
  } catch(err) {
    console.log('Error deleting run from DB', err);
  }
}

/*//////////////////////////////////////////
  TEAM TABLE INTERACTIONS
//////////////////////////////////////////*/
pool.createTeam = async ({name, charity, goal, userId}) => {
  try {
    let teamId = await pool.query(`INSERT INTO teams("name", "charity", "goal") VALUES ($1, $2, $3) RETURNING id`, [name, charity, goal]);
    teamId = teamId.rows[0].id;
    await pool.query(`UPDATE runners SET teamid = $1 WHERE id=$2`, [teamId, userId]);
    console.log(userId);
    let runner = await pool.query(`SELECT * FROM runners WHERE id=$1`, [userId]);
    runner = runner.rows[0];
    //get the runners team information
    let team = await pool.query(`SELECT * from teams WHERE id=${teamId}`);
    team= team.rows[0];
    let teammates = await pool.query(`SELECT * FROM runners WHERE teamid=${teamId}`)
    teammates = teammates.rows;
    return {
      runner,
      team,
      teammates
    };
    //return teamId
  } catch(err) {
    console.log('Error creating team', err);
  }
};

module.exports = pool;