// Live Countdown Timer
let countdownInterval;

function startLiveCountdown(targetDate) {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('live-countdown').innerHTML = '<p>Countdown finished!</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('live-countdown').innerHTML = `
            <div class="countdown">
                <h3><i class="fas fa-clock"></i> Live Countdown:</h3>
                <div class="countdown-timer">
                    <div class="time-unit">
                        <span class="number">${days}</span>
                        <span class="label">Days</span>
                    </div>
                    <div class="time-unit">
                        <span class="number">${hours}</span>
                        <span class="label">Hours</span>
                    </div>
                    <div class="time-unit">
                        <span class="number">${minutes}</span>
                        <span class="label">Minutes</span>
                    </div>
                    <div class="time-unit">
                        <span class="number">${seconds}</span>
                        <span class="label">Seconds</span>
                    </div>
                </div>
            </div>
        `;
    }, 1000);
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const icon = toggleBtn.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Tab Switching
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');

    tabContents.forEach(content => content.style.display = 'none');
    tabButtons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).style.display = 'block';
    evt.target.classList.add('active');
}

// Calculate Date Difference
function calculateDifference() {
    const startDate = new Date(document.getElementById('start_date').value);
    const endDate = new Date(document.getElementById('end_date').value);

    if (startDate >= endDate) {
        alert('Start date must be before end date');
        return;
    }

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    document.getElementById('diff-days').textContent = diffDays;
    document.getElementById('diff-weeks').textContent = diffWeeks;
    document.getElementById('diff-months').textContent = diffMonths;
    document.getElementById('diff-years').textContent = diffYears;

    document.getElementById('difference-result').style.display = 'block';
}

// Calculate Age
function calculateAge() {
    const birthDate = new Date(document.getElementById('birth_date').value);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const totalHours = Math.floor((now - birthDate) / (1000 * 60 * 60));
    const hours = totalHours % 24;
    const totalMinutes = Math.floor((now - birthDate) / (1000 * 60));
    const minutes = totalMinutes % 60;
    const seconds = Math.floor((now - birthDate) / 1000) % 60;

    document.getElementById('age-years').textContent = years;
    document.getElementById('age-months').textContent = months;
    document.getElementById('age-days').textContent = days;
    document.getElementById('age-hours').textContent = hours;
    document.getElementById('age-minutes').textContent = minutes;
    document.getElementById('age-seconds').textContent = seconds;

    document.getElementById('age-result').style.display = 'block';
}

// Calculate Day of Week
function calculateDayOfWeek() {
    const date = new Date(document.getElementById('date').value);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];

    document.getElementById('day-of-week').textContent = dayOfWeek;
    document.getElementById('dayOfWeek-result').style.display = 'block';
}

// Calculate Elapsed Time
function calculateElapsed() {
    const pastDate = new Date(document.getElementById('past_date').value);
    const now = new Date();

    const diffTime = now - pastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    document.getElementById('elapsed-years').textContent = diffYears;
    document.getElementById('elapsed-months').textContent = diffMonths;
    document.getElementById('elapsed-weeks').textContent = diffWeeks;
    document.getElementById('elapsed-days').textContent = diffDays;
    document.getElementById('elapsed-hours').textContent = hours;
    document.getElementById('elapsed-minutes').textContent = minutes;
    document.getElementById('elapsed-seconds').textContent = seconds;

    document.getElementById('elapsed-result').style.display = 'block';
}

// Start Countdown
function startCountdown() {
    const targetDateValue = document.getElementById('target_date').value;
    if (!targetDateValue) {
        alert('Please select a target date');
        return;
    }

    const targetDate = new Date(targetDateValue).getTime();
    const now = new Date().getTime();

    if (targetDate <= now) {
        alert('Target date must be in the future');
        return;
    }

    const diffTime = targetDate - now;
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = days;
    document.getElementById('countdown-hours').textContent = hours;
    document.getElementById('countdown-minutes').textContent = minutes;
    document.getElementById('countdown-seconds').textContent = seconds;

    document.getElementById('countdown-result').style.display = 'block';

    // Start live countdown
    startLiveCountdown(targetDate);
}

// Form Submission
function submitForm(formId, url) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // If it's the countdown form, start live countdown
    if (formId === 'countdown-form') {
        const targetDateValue = form.elements['target_date'].value;
        if (targetDateValue) {
            const targetDate = new Date(targetDateValue).getTime();
            startLiveCountdown(targetDate);
        }
    }

    // Show loading state
    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
    submitBtn.disabled = true;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Update the result section based on form type
        updateResultSection(formId, data);

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('An error occurred. Please try again.');
    });
}

// Update result section based on form type
function updateResultSection(formId, data) {
    let resultContainer;

    switch(formId) {
        case 'difference-form':
            resultContainer = document.querySelector('#difference .result');
            if (!resultContainer) {
                const card = document.querySelector('#difference .card');
                resultContainer = document.createElement('div');
                resultContainer.className = 'result';
                card.appendChild(resultContainer);
            }
            resultContainer.innerHTML = `
                <h3><i class="fas fa-chart-bar"></i> Result:</h3>
                <p><strong>Days:</strong> ${data.days}</p>
                <p><strong>Weeks:</strong> ${data.weeks}</p>
                <p><strong>Months:</strong> ${data.months}</p>
                <p><strong>Years:</strong> ${data.years}</p>
            `;
            break;

        case 'age-form':
            resultContainer = document.querySelector('#age .result');
            if (!resultContainer) {
                const card = document.querySelector('#age .card');
                resultContainer = document.createElement('div');
                resultContainer.className = 'result';
                card.appendChild(resultContainer);
            }
            resultContainer.innerHTML = `
                <h3><i class="fas fa-user"></i> Your Age:</h3>
                <p><strong>Years:</strong> ${data.years}</p>
                <p><strong>Months:</strong> ${data.months}</p>
                <p><strong>Days:</strong> ${data.days}</p>
                <p><strong>Hours:</strong> ${data.hours}</p>
                <p><strong>Minutes:</strong> ${data.minutes}</p>
                <p><strong>Seconds:</strong> ${data.seconds}</p>
            `;
            break;

        case 'dayOfWeek-form':
            resultContainer = document.querySelector('#dayOfWeek .result');
            if (!resultContainer) {
                const card = document.querySelector('#dayOfWeek .card');
                resultContainer = document.createElement('div');
                resultContainer.className = 'result';
                card.appendChild(resultContainer);
            }
            resultContainer.innerHTML = `
                <h3><i class="fas fa-calendar-week"></i> Day of the Week:</h3>
                <p><strong>${data.day_of_week}</strong></p>
            `;
            break;

        case 'elapsed-form':
            resultContainer = document.querySelector('#elapsed .result');
            if (!resultContainer) {
                const card = document.querySelector('#elapsed .card');
                resultContainer = document.createElement('div');
                resultContainer.className = 'result';
                card.appendChild(resultContainer);
            }
            resultContainer.innerHTML = `
                <h3><i class="fas fa-clock"></i> Time Elapsed:</h3>
                <p><strong>Years:</strong> ${data.years}</p>
                <p><strong>Months:</strong> ${data.months}</p>
                <p><strong>Weeks:</strong> ${data.weeks}</p>
                <p><strong>Days:</strong> ${data.days}</p>
                <p><strong>Hours:</strong> ${data.hours}</p>
                <p><strong>Minutes:</strong> ${data.minutes}</p>
                <p><strong>Seconds:</strong> ${data.seconds}</p>
            `;
            break;

        case 'countdown-form':
            resultContainer = document.querySelector('#countdown .countdown');
            if (!resultContainer) {
                const card = document.querySelector('#countdown .card');
                resultContainer = document.createElement('div');
                resultContainer.className = 'countdown';
                card.insertBefore(resultContainer, document.getElementById('live-countdown'));
            }
            resultContainer.innerHTML = `
                <h3><i class="fas fa-clock"></i> Countdown:</h3>
                <div class="countdown-timer">
                    <div class="time-unit">
                        <span class="number">${data.days}</span>
                        <span class="label">Days</span>
                    </div>
                    <div class="time-unit">
                        <span class="number">${data.hours}</span>
                        <span class="label">Hours</span>
                    </div>
                    <div class="time-unit">
                        <span class="number">${data.minutes}</span>
                        <span class="label">Minutes</span>
                    </div>
                    <div class="time-unit">
                        <span class="number">${data.seconds}</span>
                        <span class="label">Seconds</span>
                    </div>
                </div>
            `;
            break;
    }
}

// Particle Effects
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize Scripts
function initializeScripts() {
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-toggle').querySelector('i').className = 'fas fa-sun';
    }

    // Set default tab
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');
    tabContents.forEach(content => content.style.display = 'none');
    tabButtons.forEach(button => button.classList.remove('active'));
    document.getElementById('difference').style.display = 'block';
    document.querySelector('.tab-button[onclick*="difference"]').classList.add('active');

    // Create particles
    createParticles();

    // Add hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeScripts);
