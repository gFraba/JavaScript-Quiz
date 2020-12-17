// quiz questions  
const questions = [{
    title: "_____ is used to store a value that can not be changed:",
    choices: ["boolean", "var", "const", "let"],
    answer: "const"
},
{
    title: "Creating an empty array would like like: let colors = ___;",
    choices: ["( )", "[ ]", "{ }", "< >"],
    answer: "[ ]"
},
{
    title: "let days = ['Mon', 'Tue', 'Wed']; What is the index of Tue?",
    choices: ["Two", "Four", "One", "Zero"],
    answer: "One"
},
{
    title: "While loops continue running as long as test condition is:",
    choices: ["True", "False", "Reaches Limit", "None of the above"],
    answer: "True"
},
{
    title: "Which of the following is a falsy value?",
    choices: ["undefined", "null", "0", "All of the above"],
    answer: "All of the above"
}]


//default values for score and timer 
let score = 0;
let currentQuestion = -1;
let timeLeft = 0;
let timer;

//starts countown
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//timer stop
function endGame() {
clearInterval(timer);
// end game score display
let quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Save score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//stores user scores on local
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
let quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears score out of local
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//resets the game
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

let quizContent = 
        `<h1>JavaScript Quiz</h1>
        <h3>Click start to begin!</h3>
        <button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//subtracts 15 seconds from timer
function incorrect() {
timeLeft -= 15; 
return next();
}

//increses score by 20 on correct answer
function correct() {
score += 20;
return next();
}

//question loop 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

let quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (let buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    let buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } 
    else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}
document.getElementById("quizBody").innerHTML = quizContent;
}