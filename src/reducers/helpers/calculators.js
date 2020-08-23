import moment from 'moment';

const runFormatter = (user, runs) => {
  //format the time and calulate total miles based of runs
  let totalMiles = 0;
  let totalTime = 0;

  if(runs !== undefined) {
    //iterate over each run
    runs.forEach(run => {
      //add the total milage and time to the overall data (user level)
      totalMiles += run.miles;
      totalTime += run.time;

      //generate the formatted version of the run time
      let hours = Math.floor(run.time / 60 / 60);
      let minutes = Math.floor(run.time / 60) - (hours * 60);
      let seconds = run.time % 60;

      //add formatted property to the run with the formatted time and the pace in MPH
      run.formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
      run.pace = (run.miles / (run.time / 60 /60)).toFixed(2);

      //convert user.pace to min/mile instead of MPH
      minutes = Math.floor(60 / run.pace);
      seconds = (60 / run.pace) - minutes;
      seconds *= 60;
      seconds = seconds.toFixed()
      if(run.pace === 0) {
        run.pace = "00:00"
      } else {
        run.pace = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0'); //minutes per mile
      }
    });
  }

  //once all runs are added to the toal, create a formatted time string for the total time
  let hours = Math.floor(totalTime / 60 / 60);
  let minutes = Math.floor(totalTime / 60) - (hours * 60);
  let seconds = totalTime % 60;

  //add the properties to the user
  user.formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  user.totalMiles = totalMiles;
  user.pace = totalTime === 0 ? 0 : (totalMiles / (totalTime / 60 / 60)).toFixed(2); //MPH

  //convert user.pace to min/mile instead of MPH
  minutes = Math.floor(60 / user.pace);
  seconds = (60 / user.pace) - minutes;
  seconds *= 60;
  seconds = seconds.toFixed()
  if(user.pace === 0) {
    user.pace = "00:00"
  } else {
    user.pace = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0'); //minutes per mile
  }
  //calculate age:
  let age = (moment().diff(moment(user.birthDate), 'years'));
  user.age = age;

}

const teamAggregator = (team, members) => {
  let totalMiles = 0;
  let totalTime = 0;

  //aggregate team stats
  members.forEach(member => {
    if(member.runs === undefined) {
      return;
    }
    member.runs.forEach(run => {
      totalMiles += run.miles;
      totalTime += run.time;
    })
  })

  //once all runs are added to the toal, create a formatted time string for the total time
  let hours = Math.floor(totalTime / 60 / 60);
  let minutes = Math.floor(totalTime / 60) - (hours * 60);
  let seconds = totalTime % 60;

  //add the properties to the user
  team.formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  team.pace = totalTime === 0 ? 0 : (totalMiles / (totalTime / 60 / 60)).toFixed(2);
  team.totalMiles = totalMiles;

  minutes = Math.floor(60 / team.pace);
  seconds = (60 / team.pace) - minutes;
  seconds *= 60;
  seconds = seconds.toFixed();
  if(team.pace === 0) {
    team.pace = "00:00"
  } else {
    team.pace = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0'); //minutes per mile
  }

}

export {
  runFormatter,
  teamAggregator
};