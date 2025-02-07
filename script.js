const questions = [
    {
        question: "Câu 1: Khi tham gia giao thông, người điều khiển xe phải làm gì?",
        answers: [
            { text: "Đi đúng phần đường, làn đường", correct: true },
            { text: "Đi vào làn đường ô tô nếu đường vắng", correct: false },
            { text: "Chạy nhanh vượt các xe khác", correct: false }
        ]
    },
    {
        question: "Câu 2: Biển báo nào là biển cấm?",
        answers: [
            { text: "Biển hình tròn, viền đỏ", correct: true },
            { text: "Biển hình chữ nhật, màu xanh", correct: false },
            { text: "Biển tam giác, viền vàng", correct: false }
        ]
    },
    {
        question: "Câu 3: Khi gặp đèn đỏ, bạn phải làm gì?",
        answers: [
            { text: "Dừng lại trước vạch", correct: true },
            { text: "Tiếp tục đi nếu đường vắng", correct: false },
            { text: "Đi chậm lại nhưng không dừng", correct: false }
        ]
    },
    // Thêm thêm câu hỏi tại đây cho đủ 25 câu
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Câu tiếp theo";
    nextButton.style.display = "none";
    scoreElement.innerHTML = "";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
}

function selectAnswer(button, isCorrect) {
    if (isCorrect) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    Array.from(answerButtonsElement.children).forEach(btn => {
        btn.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = "Bạn đã hoàn thành bài thi!";
    scoreElement.innerText = `Điểm số của bạn: ${score}/${questions.length}`;
    nextButton.innerHTML = "Làm lại";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
