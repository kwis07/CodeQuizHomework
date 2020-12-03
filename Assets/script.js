//The things that will never change


const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let currentQuestionIndex = 0; 
const questions = [
    {
        question: "What does CSS stands for?",
        answers: [
            { text: " Creative Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: " Computer Style Sheets", correct: false },
            { text: " Colorful Style Sheets", correct: false },
        ]

    }
    


]

//Event attached to the Start button to start the game
startButton.addEventListener('click', function startGame() {
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    showQuestion(questions[currentQuestionIndex])
})


//For the next button
// function setNextQuestion() {
//     resetState()
//     showQuestion(questions[currentQuestionIndex])

// }

function showQuestion(question){
    questionElement.innerText = question.question;
    for (var i = 0; i < question.answers.length; i ++){
        var item = question.answers[i];
        const button = document.createElement('button')
        button.innerText = item.text
        button.classList.add('btn')
        if (item.correct) {
            button.dataset.correct = item.correct  //ONLY SETTING IF THE ANSWER IS CORRECT SO THERE WOULD BE NO CONFUSION IF IT IS FALSE 
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    }
     question.answers.forEach(answer => {
         const button = document.createElement('button')
         button.innerText = answers.text
         button.classList.add('btn')
         if (answer.correct) {
             button.dataset.correct = answer.correct  //ONLY SETTING IF THE ANSWER IS CORRECT SO THERE WOULD BE NO CONFUSION IF IT IS FALSE 
         }
         button.addEventListener('click', selectAnswer)
         answerButtonsElement.appendChild(button)

      
     })

}

function resetState(){
    nextButton.classList.add('hide')
   
}

//For the selected answer
function selectAnswer(e) {
    console.log("button-click")
    // const selectedButton = e.target
    // const correct = selectedButton.dataset.correct
    // setStatusClass(document.body, correct)
    // Array.from(answerButtonsEl.children).forEach(button => {
    //     setStatusClass(button, button.dataset.correct)
    // })
}


function setStatusClass(element, correct) {
    clearStatusclass(element)
    if (correct) {
       element.classList.add('correct') 
    }
}
//Question list
