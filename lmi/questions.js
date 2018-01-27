// CAREFUL THAT GENERATED FALSE ANSWERS DO NOT EQUAL THE REAL ANSWER

function getQuestions(soc,regionCode) {
  var questions = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/soc/code/${soc}`)
    .then(response => response.json())
    .then(function(json){
      var jobTitle = json.title.toLowerCase();
      howManyInYourRegion(soc,jobTitle,regionCode,questions);
      howManyInTheUK(soc,jobTitle,questions);
      femalePercentage(soc,jobTitle,questions);
      mostCommonDegree(soc,jobTitle,questions);
      mostImportantSkill(soc,jobTitle,questions)
      biggestEmployingIndustry(soc,jobTitle,questions);
      estimatedHours(soc,jobTitle,questions);
      estimatedPay(soc,jobTitle,questions);
    });
  setTimeout( () => print(questions), 2000);
};

function howManyInYourRegion(soc,jobTitle,regionCode,questions) {
  var today = new Date();
  var year = today.getFullYear();
  var questionYear = 0;
  var regionTitle = '';
  var predictionNumber = 0;
  var arrRegion = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/wf/predict/breakdown/region?soc=${soc}`)
    .then(response => response.json())
    .then(json => json.predictedEmployment[Math.floor(Math.random() * (2025 - year))])
    .then(function(yearPrediction){
      questionYear = yearPrediction.year;
      for(k=0;k<12;k++) {
        if (yearPrediction.breakdown[k].code == regionCode) {
          if (/[356]/.test(regionCode)) {
            regionTitle = 'the ' + yearPrediction.breakdown[k].name;
          } else {
            regionTitle = yearPrediction.breakdown[k].name;
            regionTitle = regionTitle.replace(/[^\w\s]/g, "");
          }
          predictionNumber = yearPrediction.breakdown[k].employment;
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
  var year = today.getFullYear();
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

function femalePercentage(soc,jobTitle,questions) {
  var today = new Date();
  var year = today.getFullYear();
  var questionYear = 0;
  var regionTitle = '';
  var malePrediction = 0;
  var femalePrediction = 0;
  var femalePercentage = 0;
  var arrFemale = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/wf/predict/breakdown/gender?soc=${soc}`)
    .then(response => response.json())
    .then(json => json.predictedEmployment[Math.floor(Math.random() * (2025 - year))])
    .then(function(yearGenderPrediction){
      questionYear = yearGenderPrediction.year;
      for(j=0;j<2;j++) {
        if (yearGenderPrediction.breakdown[j].code == 1) {
          malePrediction = yearGenderPrediction.breakdown[j].employment;
        } else if (yearGenderPrediction.breakdown[j].code == 2) {
          femalePrediction = yearGenderPrediction.breakdown[j].employment;
        }
      }
      var femalePercentage = ((femalePrediction / (malePrediction + femalePrediction)) * 100).toFixed(1);
      arrFemale.push(`What percentage of ${jobTitle} are predicted to be female in the UK in ${questionYear}?`);
      arrFemale.push(femalePercentage);
      arrFemale.push([(Math.random() * 100).toFixed(1), (Math.random() * 100).toFixed(1)]);
      questions.push(arrFemale);
      // arr = [question,answer,[wrongAnswerOne,wrongAnswerTwo]]
    });
};

function mostCommonDegree(soc,jobTitle,questions) {
  var orderedDegrees = [];
  var arrDegrees = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/hesa/courses/${soc}`)
    .then(response => response.json())
    .then(json => json.years[json.years.length-1])
    .then(function(mostRecent){
      if (mostRecent.courses.length < 3) {
        return
      }
      orderedDegrees = mostRecent.courses.sort(function(gamma,delta){
        return delta.percentage - gamma.percentage;
      });
      arrDegrees.push(`Which is the most common degree for ${jobTitle}?`)
      arrDegrees.push(orderedDegrees[0].name.substring(5))
      arrDegrees.push([orderedDegrees[1+Math.floor(Math.random()*(orderedDegrees.length-1))].name.substring(5),orderedDegrees[orderedDegrees.length-1].name.substring(5)])
      questions.push(arrDegrees);
    });
};

function mostImportantSkill(soc,jobTitle,questions) {
  var arrSkill = [];
  var orderedSkills = [];
  var rankOne = [];
  var rankTwo = [];
  var rankThree = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/onet/importance/${soc}`)
    .then(response => response.json())
    .then(json => json.skills)
    .then(function(skills){
      for (l=0;l<skills.length;l++) {
        if (skills[l].rank == 1) {
          rankOne.push(skills[l])
        } else if (skills[l].rank == 2) {
          rankTwo.push(skills[l])
        } else {
          rankThree.push(skills[l])
        }
      };
      if (rankOne.length < 1) {
        return
      }
      rankOne.sort(function(alpha,beta){
        return beta.score - alpha.score;
      });
      rankTwo.sort(function(alpha,beta){
        return beta.score - alpha.score;
      });
      rankThree.sort(function(alpha,beta){
        return beta.score - alpha.score;
      });
      orderedSkills = rankOne.concat(rankTwo).concat(rankThree)
      console.log(orderedSkills)
      arrSkill.push(`Which of the following is ranked the most important skill for ${jobTitle}?`)
      arrSkill.push(orderedSkills[0].name)
      arrSkill.push([orderedSkills[2+Math.floor(Math.random() * 4)].name,orderedSkills[6+Math.floor(Math.random() * 4)].name])
      questions.push(arrSkill);
      // arr = [question,answer,[wrongAnswerOne,wrongAnswerTwo]]
    });
};

function biggestEmployingIndustry(soc,jobTitle,questions){
  var today = new Date();
  var year = today.getFullYear();
  var questionYear = 0;
  var regionTitle = '';
  var orderedIndustries = [];
  var arrIndustry = [];
  fetch(`http://api.lmiforall.org.uk/api/v1/wf/predict/breakdown/industry?soc=${soc}`)
    .then(response => response.json())
    .then(json => json.predictedEmployment[Math.floor(Math.random() * (2025 - year))])
    .then(function(yearIndustryPrediction){
      questionYear = yearIndustryPrediction.year;
      orderedIndustries = yearIndustryPrediction.breakdown.sort(function(epsilon,zeta){
        return zeta.employment - epsilon.employment;
      });
      if (orderedIndustries.length < 3) {
        return
      } else if (orderedIndustries.length > 10) {
      arrIndustry.push(`Which industry is expected to employ the most ${jobTitle} in ${questionYear}?`)
      arrIndustry.push(orderedIndustries[0].name)
      arrIndustry.push([orderedIndustries[1+Math.floor(Math.random()*5)].name,orderedIndustries[5+Math.floor(Math.random()*(orderedIndustries.length-6))].name])
      questions.push(arrIndustry);
      } else {
        arrIndustry.push(`Which industry is expected to employ the most ${jobTitle} in ${questionYear}?`)
        arrIndustry.push(orderedIndustries[0].name)
        arrIndustry.push([orderedIndustries[1+Math.floor(Math.random()*(orderedIndustries.length-1))].name,orderedIndustries[orderedIndustries.length-1].name])
        questions.push(arrIndustry);
      }
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
