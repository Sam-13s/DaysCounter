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
