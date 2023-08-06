// SGPA Calculator

const grades = {
  'S': { minScore: 90, maxScore: 100, gradePoints: 10 },
  'A+': { minScore: 80, maxScore: 89, gradePoints: 9 },
  'A': { minScore: 70, maxScore: 79, gradePoints: 8 },
  'B+': { minScore: 60, maxScore: 69, gradePoints: 7 },
  'B': { minScore: 50, maxScore: 59, gradePoints: 6 },
  'C': { minScore: 40, maxScore: 49, gradePoints: 5 },
  'F': { minScore: 0, maxScore: 39, gradePoints: 0 },
};

document.getElementById('addCoursesBtn').addEventListener('click', addCourseInputs);
document.getElementById('calculateBtn').addEventListener('click', calculateSGPA);

function addCourseInputs() {
  const numCoursesInput = document.getElementById('numCourses');
  const numCourses = parseInt(numCoursesInput.value, 10);

  if (isNaN(numCourses) || numCourses < 1) {
    alert("Please enter a valid number of courses (minimum 1).");
    return;
  }

  const courseInputsDiv = document.getElementById('courseInputs');
  courseInputsDiv.innerHTML = '';

  for (let i = 1; i <= numCourses; i++) {
    const courseInput = document.createElement('div');
    courseInput.classList.add('course-input');
    courseInput.innerHTML = `
      <h3>Course ${i}</h3>
      <label for="course${i}Credits">Credits:</label>
      <input type="number" id="course${i}Credits" class="course-credit" min="1" step="0.5">
      <label for="course${i}Score">Score:</label>
      <input type="number" id="course${i}Score" class="course-score" min="0" max="100">
    `;
    courseInputsDiv.appendChild(courseInput);
  }
}

function calculateSGPA() {
  const courseScoreElements = document.querySelectorAll('.course-score');
  const courseCreditElements = document.querySelectorAll('.course-credit');
  const totalCourses = courseScoreElements.length;
  let totalCredits = 0;
  let totalPoints = 0;

  for (let i = 0; i < totalCourses; i++) {
    const credit = parseFloat(courseCreditElements[i].value);
    const score = parseInt(courseScoreElements[i].value, 10);

    if (!isNaN(credit) && credit > 0 && !isNaN(score) && score >= 0 && score <= 100) {
      const grade = getGradeFromScore(score);
      totalCredits += credit;
      totalPoints += credit * grades[grade].gradePoints;
    } else {
      alert("Please enter valid credits (greater than 0) and scores (0 to 100) for all courses.");
      return;
    }
  }

  if (totalCourses === 0) {
    alert("Please add at least one course.");
    return;
  }

  const sgpa = totalPoints / totalCredits;
  const resultDiv = document.getElementById('result');

  if (isNaN(sgpa) || sgpa <= 0) {
    resultDiv.innerHTML = 'Please enter valid scores and credits for all courses.';
  } else {
    resultDiv.innerHTML = `Your SGPA is: ${sgpa.toFixed(2)}. We're not going to judge you by your marks. Have a good day!`;
  }
}

function getGradeFromScore(score) {
  for (const grade in grades) {
    if (score >= grades[grade].minScore && score <= grades[grade].maxScore) {
      return grade;
    }
  }
  return 'F'; // If the score does not fall within any range, return 'F' grade.
}
