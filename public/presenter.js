const socket = io();

const liveQuestionContent = document.getElementById('live-question-content');
const nextUpQuestionContent = document.getElementById('next-up-question-content');
const approvedQuestionsContent = document.getElementById('approved-questions-content');
const timerContent = document.getElementById('timer-content');

socket.on('live_question', (question) => {
    if (question) {
        liveQuestionContent.innerHTML = `
            <div>${question.text}</div>
            <div>- ${question.username}</div>
        `;
    } else {
        liveQuestionContent.innerHTML = '';
    }
});

socket.on('next_up_question', (question) => {
    if (question) {
        nextUpQuestionContent.innerHTML = `
            <div>${question.text}</div>
            <div>- ${question.username}</div>
        `;
    } else {
        nextUpQuestionContent.innerHTML = '';
    }
});

socket.on('approved_questions', (questions) => {
    approvedQuestionsContent.innerHTML = '';
    const recentQuestions = questions.slice(0, 5);
    recentQuestions.forEach(q => {
        const div = document.createElement('div');
        div.innerHTML = `<div>${q.text}</div><div>- ${q.username}</div><hr>`;
        approvedQuestionsContent.appendChild(div);
    });
});

socket.on('timer_update', (seconds) => {
    updateTimerDisplay(seconds);
});

function updateTimerDisplay(timerSeconds) {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerContent.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timerSeconds < 120) {
        timerContent.style.color = 'lightgreen';
    } else if (timerSeconds < 300) {
        timerContent.style.color = 'yellow';
    } else {
        timerContent.style.color = 'red';
    }
}
