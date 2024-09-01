function toggleAnswer(index) {
    const answer = document.getElementById('answer' + index);
    const question = answer.previousElementSibling;

    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        question.classList.remove('active');
    } else {
        answer.style.display = 'block';
        question.classList.add('active');
    }
}

function closeAnswer(event, index) {
    event.stopPropagation(); // Prevents the event from triggering the toggleAnswer function
    const answer = document.getElementById('answer' + index);
    const question = answer.previousElementSibling;

    answer.style.display = 'none';
    question.classList.remove('active');
}
