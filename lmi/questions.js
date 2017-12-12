// const fetch = require('node-fetch')

// needed inputs


function getQuestions(soc,regionCode,genderCode) {
  var questions = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/soc/code/${soc}`)
    .then(response => response.json())
    .then(function(json){
      var jobTitle = json.title.toLowerCase();
      howManyInYourRegion(soc,jobTitle,regionCode,questions);
      howManyInTheUK(soc,jobTitle,questions);
      femalePercentage(soc,jobTitle,questions);
      estimatedHours(soc,jobTitle,questions);
      estimatedPay(soc,jobTitle,questions);
    });
  setTimeout( () => print(questions), 2000);
};

function howManyInYourRegion(soc,jobTitle,regionCode,questions) {
  var today = new Date();
  var year = today.getFullYear(); //this is a number
  var questionYear = 0;
  var regionTitle = '';
  var predictionNumber = 0;
  var arrRegion = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/wf/predict/breakdown/region?soc=${soc}`)
    .then(response => response.json())
    .then(json => json.predictedEmployment[Math.floor(Math.random() * (2025 - year))])
    .then(function(yearPrediction){
      questionYear = yearPrediction.year;
      for(i=0;i<12;i++) {
        if (yearPrediction.breakdown[i].code == regionCode) {
          if (/[356]/.test(regionCode)) {
            regionTitle = 'the ' + yearPrediction.breakdown[i].name;
          } else {
            regionTitle = yearPrediction.breakdown[i].name;
            regionTitle = regionTitle.replace(/[^\w\s]/g, "");
          }
          predictionNumber = yearPrediction.breakdown[i].employment;
        }
      }
      arrRegion.push(`How many ${jobTitle} are there predicted to be in ${regionTitle} in ${questionYear}?`);
      arrRegion.push(predictionNumber);
      arrRegion.push([Math.floor(Math.random() * 25000), Math.floor(Math.random() * 5000)]);
      questions.push(arrRegion);
      // arr = [question,answer,[wrongAnswerOne,wrongAnswerTwo]]
    });
};

function howManyInTheUK(soc,jobTitle,questions) {
  var today = new Date();
  var year = today.getFullYear(); //this is a number
  var questionYear = 0;
  var regionTitle = '';
  var predictionNumber = 0;
  var arrUK = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/wf/predict?soc=${soc}`)
    .then(response => response.json())
    .then(json => json.predictedEmployment[Math.floor(Math.random() * (2025 - year))])
    .then(function(yearPrediction){
      questionYear = yearPrediction.year;
      predictionNumber = yearPrediction.employment;
      arrUK.push(`How many ${jobTitle} are there predicted to be in the UK in ${questionYear}?`);
      arrUK.push(predictionNumber);
      arrUK.push([Math.floor(Math.random() * 150000), Math.floor(Math.random() * 10000)]);
      questions.push(arrUK);
      // arr = [question,answer,[wrongAnswerOne,wrongAnswerTwo]]
    });
};

function qualification(soc,jobTitle,questions) {

}

function mostImportantSkill(soc,jobTitle,questions) {

}

function femalePercentage(soc,jobTitle,questions) {
  var today = new Date();
  var year = today.getFullYear(); //this is a number
  var questionYear = 0;
  var regionTitle = '';
  var malePrediction = 0;
  var femalePrediction = 0;
  var femalePercentage = 0;
  var arrFemale = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/wf/predict/breakdown/gender?soc=${soc}`)
    .then(response => response.json())
    .then(json => json.predictedEmployment[Math.floor(Math.random() * (2025 - year))])
    .then(function(yearPrediction){
      questionYear = yearPrediction.year;
      for(i=0;i<2;i++) {
        if (yearPrediction.breakdown[i].code == 1) {
          malePrediction = yearPrediction.breakdown[i].employment;
        } else if (yearPrediction.breakdown[i].code == 2) {
          femalePrediction = yearPrediction.breakdown[i].employment;
        }
      }
      var femalePercentage = ((femalePrediction / (malePrediction + femalePrediction)) * 100).toFixed(1);
      arrFemale.push(`How many ${jobTitle} are predicted to be female in the UK in ${questionYear}?`);
      arrFemale.push(femalePercentage);
      arrFemale.push([(Math.random() * 100).toFixed(1), (Math.random() * 100).toFixed(1)]);
      questions.push(arrFemale);
      // arr = [question,answer,[wrongAnswerOne,wrongAnswerTwo]]
    });
};

function estimatedHours(soc,jobTitle,questions) {
  predictedHours = 0;
  arrHours = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/ashe/estimateHours?soc=${soc}`)
    .then(response => response.json())
    .then(function(json){
      predictedHours = json.series[0].hours;
      arrHours.push(`What are the estimated weekly hours for ${jobTitle}?`);
      arrHours.push(predictedHours);
      arrHours.push([Math.floor(Math.random() * 30 + 10), Math.floor(Math.random() * 50 + 20)]);
      questions.push(arrHours);
      // arr = [question,answer,[wrongAnswerOne,wrongAnswerTwo]]
    });
};


function estimatedPay(soc,jobTitle,questions) {
  predictedPay = 0;
  arrPay = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=${soc}`)
    .then(response => response.json())
    .then(function(json){
      predictedPay = json.series[0].estpay;
      arrPay.push(`What is the estimated weekly pay for ${jobTitle}?`);
      arrPay.push(predictedPay);
      arrPay.push([Math.floor(Math.random() * 2000), Math.floor(Math.random() * 500)]);
      questions.push(arrPay);
      // arr = [question,answer,[wrongAnswerOne,wrongAnswerTwo]]
    });
}

function print(questions) {
  for (i=0;i<questions.length;i++){
    var q = questions[i];
    var myDiv = document.createElement('div');
    var myParagraph = document.createElement('paragraph');
    myParagraph.innerHTML = q[0];
    document.body.appendChild(myDiv);
    myDiv.appendChild(myParagraph);
    var rand = Math.floor(Math.random() * 6);
    switch (rand) {
      case 0:
        correct(i,q,myDiv);
        incorrectOne(i,q,myDiv);
        incorrectTwo(i,q,myDiv);
        break;
      case 1:
        correct(i,q,myDiv);
        incorrectTwo(i,q,myDiv);
        incorrectOne(i,q,myDiv);
        break;
      case 2:
        incorrectOne(i,q,myDiv);
        correct(i,q,myDiv);
        incorrectTwo(i,q,myDiv);
        break;
      case 3:
        incorrectOne(i,q,myDiv);
        incorrectTwo(i,q,myDiv);
        correct(i,q,myDiv);
        break;
      case 4:
        incorrectTwo(i,q,myDiv);
        correct(i,q,myDiv);
        incorrectOne(i,q,myDiv);
        break;
      case 5:
        incorrectTwo(i,q,myDiv);
        incorrectOne(i,q,myDiv);
        correct(i,q,myDiv);
        break;
    }
  }
}

function correct(index,question,div) {
  var correct = document.createElement('button');
  correct.addEventListener("mousedown", function( event ) {
    event.target.style.background = 'green';
  });
  correct.innerHTML = question[1];
  div.appendChild(correct);
}

function incorrectOne(index,question,div) {
  var incorrectOne = document.createElement('button');
  incorrectOne.addEventListener("mousedown", function( event ) {
    event.target.style.background = 'red';
  });
  incorrectOne.innerHTML = question[2][0];
  div.appendChild(incorrectOne);
}

function incorrectTwo(index,question,div) {
  var incorrectTwo = document.createElement('button');
  incorrectTwo.addEventListener("mousedown", function( event ) {
    event.target.style.background = 'red';
  });
  incorrectTwo.innerHTML = question[2][1];
  div.appendChild(incorrectTwo);
}
