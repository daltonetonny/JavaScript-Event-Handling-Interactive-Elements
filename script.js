// Sound Effect
const clickSound = document.getElementById('clickSound');

// Event Handling: Button
const magicButton = document.getElementById('magicButton');
const buttonStatus = document.getElementById('buttonStatus');

magicButton.addEventListener('click', () => {
    magicButton.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    buttonStatus.textContent = '🎉 Woohoo! Color changed!';
    clickSound.play();
});

magicButton.addEventListener('mouseover', () => {
    buttonStatus.textContent = '😺 Meow! You’re hovering!';
    magicButton.style.transform = 'rotate(5deg)';
});

magicButton.addEventListener('mouseout', () => {
    buttonStatus.textContent = 'Ready for some magic? 🪄';
    magicButton.style.transform = 'rotate(0deg)';
});

document.addEventListener('keypress', (e) => {
    buttonStatus.textContent = `🎹 Key pressed: ${e.key.toUpperCase()}!`;
});

// Bonus: Double-click with Confetti
magicButton.addEventListener('dblclick', () => {
    buttonStatus.textContent = '💥 DOUBLE TAP! PARTY TIME!';
    magicButton.textContent = '🎉 BOOM! 🎉';
    triggerConfetti();
    clickSound.play();
    setTimeout(() => {
        magicButton.textContent = '✨ Tap Me! ✨';
    }, 1500);
});

// Confetti Effect
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function triggerConfetti() {
    const colors = ['#ff69b4', '#00CED1', '#FFD700', '#32CD32', '#6A5ACD'];
    const particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 5 + 2,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 100
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;
            p.size *= 0.98;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            if (p.life <= 0) particles.splice(i, 1);
        });
        if (particles.length) requestAnimationFrame(animate);
    }
    animate();
}

// Image Gallery
const galleryImages = document.querySelectorAll('.gallery-img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentImage = 0;

function showImage(index) {
    galleryImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    buttonStatus.textContent = `🖼️ Showing image ${index + 1}!`;
    clickSound.play();
}

prevBtn.addEventListener('click', () => {
    currentImage = (currentImage - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImage);
});

nextBtn.addEventListener('click', () => {
    currentImage = (currentImage + 1) % galleryImages.length;
    showImage(currentImage);
});

// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
        buttonStatus.textContent = `🎟️ Opened ${button.textContent}!`;
        clickSound.play();
    });
});

// Form Validation
const form = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
    let isValid = true;

    if (!nameInput.value.trim()) {
        nameError.textContent = '😿 Please enter your hero name!';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    if (!validateEmail(emailInput.value)) {
        emailError.textContent = '📧 Oops! That email looks weird!';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    if (passwordInput.value.length < 8) {
        passwordError.textContent = '🔒 Password needs 8+ characters, hero!';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    if (isValid) {
        buttonStatus.textContent = '🎉 Form submitted! You’re a superstar!';
        triggerConfetti();
        clickSound.play();
    }

    return isValid;
}

// Real-time Feedback (Bonus)
nameInput.addEventListener('input', () => {
    nameError.textContent = nameInput.value.trim() ? '😺 Looking good!' : '😿 Please enter your hero name!';
});

emailInput.addEventListener('input', () => {
    emailError.textContent = validateEmail(emailInput.value) ? '📧 Awesome email!' : '📧 Oops! That email looks weird!';
});

passwordInput.addEventListener('input', () => {
    passwordError.textContent = passwordInput.value.length >= 8 ? '🔒 Super secure!' : '🔒 Password needs 8+ characters, hero!';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
});
