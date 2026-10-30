const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 330, title: 'Web Frontend Development II', credits: 2, completed: false },
    { subject: 'CSE', number: 310, title: 'Data Structures', credits: 3, completed: false }
];

const courseList = document.getElementById('courseList');
const creditTotal = document.getElementById('creditTotal');
const filterButtons = document.querySelectorAll('.filter-btn');

function displayCourses(filteredCourses) {
    // Clear current list
    courseList.innerHTML = '';

    // Create cards for each course
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p><strong>${course.credits} credits</strong></p>
            ${course.completed ? '<p><em>Completed</em></p>' : '<p>Not Completed</p>'}
        `;
        
        courseList.appendChild(card);
    });

    // Calculate total credits using reduce()
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = total;
}

function filterCourses(filter) {
    let filtered;
    if (filter === 'wdd') {
        filtered = courses.filter(course => course.subject === 'WDD');
    } else if (filter === 'cse') {
        filtered = courses.filter(course => course.subject === 'CSE');
    } else {
        filtered = courses; // 'all'
    }
    displayCourses(filtered);
}

// Add event listeners to buttons
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        e.target.setAttribute('aria-pressed', 'true');

        // Filter based on data-filter attribute
        const filterValue = e.target.getAttribute('data-filter');
        filterCourses(filterValue);
    });
});

// Initial display on page load
displayCourses(courses);