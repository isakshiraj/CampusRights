let semesters = []; // Array to hold data for each semester
let currentSemesterIndex = 0; // Index of the current semester being displayed
let editIndex = -1; // Index of the subject being edited

function addSubject() {
    const subjectInput = document.getElementById('subject');
    const grade = document.getElementById('grade').value;
    const creditInput = document.getElementById('credit');
    const credit = parseInt(creditInput.value);

    // Validate credit input
    const inputError = document.getElementById('inputError');
    const creditError = document.getElementById('creditError');
    if (!subjectInput.value || isNaN(credit)) {
        inputError.textContent = 'Please fill out all fields.';
        return;
    } else if (credit < 1 || credit > 20) {
        creditError.textContent = 'Credit must be between 1 and 20';
        return;
    } else {
        creditError.textContent = '';
    }

    if (editIndex !== -1) {
        semesters[currentSemesterIndex].subjects[editIndex] = { subject: subjectInput.value, grade, credit };
        editIndex = -1;
    } else {
        semesters[currentSemesterIndex].subjects.push({ subject: subjectInput.value, grade, credit });
    }

    displaySubjects();
    clearForm();
}

function displaySubjects() {
    const subjectList = document.getElementById('subjectList');
    subjectList.innerHTML = '';

    semesters[currentSemesterIndex].subjects.forEach((s, index) => {
        const row = document.createElement('tr');

        const subjectCell = document.createElement('td');
        subjectCell.textContent = s.subject;

        const gradeCell = document.createElement('td');
        gradeCell.textContent = s.grade;

        const creditCell = document.createElement('td');
        creditCell.textContent = s.credit;

        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editSubject(index);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSubject(index);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(subjectCell);
        row.appendChild(gradeCell);
        row.appendChild(creditCell);
        row.appendChild(actionCell);

        subjectList.appendChild(row);
    });
}

function editSubject(index) {
    const subjectInput = document.getElementById('subject');
    const selectedSubject = semesters[currentSemesterIndex].subjects[index];

    subjectInput.value = selectedSubject.subject;
    document.getElementById('grade').value = selectedSubject.grade;
    document.getElementById('credit').value = selectedSubject.credit;

    editIndex = index;
}

function deleteSubject(index) {
    semesters[currentSemesterIndex].subjects.splice(index, 1);
    displaySubjects();
}

function calculateSGPA() {
    const subjects = semesters[currentSemesterIndex].subjects;
    const totalCredits = subjects.reduce((sum, s) => sum + s.credit, 0);
    const weightedSum = subjects.reduce((sum, s) => sum + getGradePoint(s.grade) * s.credit, 0);

    const sgpa = totalCredits === 0 ? 0 : (weightedSum / totalCredits).toFixed(2);
    document.getElementById('sgpa').textContent = sgpa;
    return parseFloat(sgpa);
}

function calculateCGPA() {
    let totalWeightedSum = 0;
    let totalCredits = 0;

    semesters.forEach((semester) => {
        const semesterCredits = semester.subjects.reduce((sum, s) => sum + s.credit, 0);
        const semesterWeightedSum = semester.subjects.reduce((sum, s) => sum + getGradePoint(s.grade) * s.credit, 0);

        totalWeightedSum += semesterWeightedSum;
        totalCredits += semesterCredits;
    });

    const cgpa = totalCredits === 0 ? 0 : (totalWeightedSum / totalCredits).toFixed(2);
    document.getElementById('cgpa').textContent = cgpa;
}

function getGradePoint(grade) {
    switch (grade) {
        case 'A+': return 10.0;
        case 'A': return 9.0;
        case 'B+': return 8.0;
        case 'B': return 7.0;
        case 'C+': return 6.0;
        case 'C': return 5.0;
        case 'D': return 4.0;
        case 'F': return 0.0;
        default: return 0.0;
    }
}

function clearForm() {
    document.getElementById('subject').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('credit').value = '';
}

function resetForm() {
    semesters = [];
    currentSemesterIndex = 0;
    editIndex = -1;
    document.getElementById('subjectList').innerHTML = '';
    document.getElementById('sgpa').textContent = '0.00';
    document.getElementById('cgpa').textContent = '0.00';
    clearForm();
}

function addSemester() {
    semesters.push({ subjects: [] });
    currentSemesterIndex = semesters.length - 1;
    displaySubjects();
}

function switchSemester(index) {
    currentSemesterIndex = index;
    displaySubjects();
}

document.addEventListener('DOMContentLoaded', () => {
    addSemester(); // Initialize with the first semester
});
