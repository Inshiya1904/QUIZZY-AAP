const QuizData = [
    {
        question: "What is the primary ingredient in traditional French béchamel sauce?",
        options: ["Chicken broth","Fish stock","Milk","Tomato"],
        answer: "Milk",
    },
    {
        question: "What platform is the most often used for video game live streaming?",
        options: ["Twitch","YouTube","Facebook Live","Vimeo"],
        answer: "Twitch",
    },
    {
        question: "In which novel does the character Atticus Finch appear?",
        options: ["Catcher in the Rye","To Kill a Mockingbird","The Great Gatsby","1984"],
        answer: "To Kill a Mockingbird",
    },
    {
        question: "What feature did Instagram introduce in 2016 to compete with Snapchat?",
        options: ["Stories","Reels","IGTV","Live Streaming"],
        answer: "Stories",
    },
    {
        question: "How many bones are there in the adult human body?",
        options: [186,206,226,788],
        answer: 206,
    },
    {
        question: "What feature did Instagram introduce in 2016 to compete with Snapchat?",
        options: ["Stories","Reels","IGTV","Live Streaming"],
        answer: "Stories",
    },

];

let currentQueIndex = 0;
let userAnswers = [];
let timeLeft = 59;
let timer;


const questionContainer = document.querySelector(".quiz-Question");
const optionsContainer = document.querySelector(".quiz-Options")

const quizContainer = document.querySelector(".quiz-container");
const nextButton = document.querySelector(".next-btn");
const submitButton = document.querySelector(".submit-btn");
const scoreContainer = document.querySelector(".score-container");
const TimerDisplay = document.querySelector(".timer");
const startQuiz = document.querySelector(".start-btn");

startQuiz.addEventListener("click",()=>{
    startQuiz.style.display = "none";
    TimerDisplay.style.display = "block";
    quizContainer.style.display = "block"
    submitButton.style.display = "block"
})

displayQuestion();
startTimer();

function updateTimer(){
    if(timeLeft>0)
    {
        const seconds = timeLeft;
        const displaySeconds = seconds<10 ? `0${seconds}` : seconds;
        TimerDisplay.textContent = displaySeconds;
        timeLeft--;
    }
    else{
        TimerDisplay.textContent = `Thank you!`;
        showQuizResults();
    }                    
}
function startTimer(){
    updateTimer();
    timer = setInterval(updateTimer,1000);
}


function selectAnswer(answer)
{

    const optionButtons = document.querySelectorAll(".quiz-option");

    optionButtons.forEach((button)=>{
        button.classList.remove("selected")
    });

    const selectedOption = optionsContainer.querySelector(
        `.quiz-option[data-option="${answer}"]`
    )
    selectedOption.classList.add("selected");
    userAnswers[currentQueIndex] = answer;
}

function displayQuestion()
{
    const currentQuestion = QuizData[currentQueIndex];
    questionContainer.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    const optionletters = ["A","B","C","D"];


currentQuestion.options.forEach((option,index)=>{
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("quiz-card");

    const optionlabel = document.createElement("span")
    optionlabel.classList.add("option-label");
    optionlabel.textContent = optionletters[index];

    optionContainer.appendChild(optionlabel);

    const optionButton = document.createElement("button");
    optionButton.classList.add("quiz-option");
    optionButton.textContent = option;
  
    optionButton.setAttribute("data-option",option);
    optionContainer.addEventListener("click",()=>{
        selectAnswer(option);
    })
    optionContainer.appendChild(optionButton);

    optionsContainer.appendChild(optionContainer);
});
};

function loadNextQuestion(){
    if(currentQueIndex < QuizData.length-1)
    {
        currentQueIndex++;
        displayQuestion();
    }
    else
    {
        showQuizResults();
    }
}

nextButton.addEventListener("click", ()=>{
    loadNextQuestion();

})

function evaluateUserAnswer()
{
    let score = 0
    QuizData.forEach((question,index)=>{
        if(userAnswers[index] === question.answer)
        {
            score++;
        }
    })
    return score;
}
function showQuizResults(){
    const userScore = evaluateUserAnswer();
    scoreContainer.textContent = `Your Score: ${userScore} out of ${QuizData.length}`
}

submitButton.addEventListener("click",()=>{
   
    timer = setInterval(updateTimer,0);
    TimerDisplay.textContent = `Thank you!`;

        showQuizResults();

})