/* ===============================
   TYPING EFFECT
================================= */

const textArray = [
    "Helping businesses automate operations.",
    "Building scalable AI systems.",
    "Transforming ideas into digital products.",
    "Based in Port Harcourt. Serving globally."
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing-text");

    if (index >= textArray.length) index = 0;

    currentText = textArray[index];

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex === 0) {
            isDeleting = false;
            index++;
        }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);
}

typeEffect();

/* ===============================
   SCROLL COUNTER ANIMATION
================================= */

const counters = document.querySelectorAll('.counter');
let started = false;

function startCounters() {

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText;
            const increment = target / 100;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });

}

window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats-section');
    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < window.innerHeight - 100 && !started) {
        startCounters();
        started = true;
    }
});

fetch("https://api.github.com/users/akachi-stack")
    .then(response => response.json())
    .then(data => {
        if(data.public_repos !== undefined) {
            document.getElementById("githubRepos").innerText = data.public_repos;
        } else {
            document.getElementById("githubRepos").innerText = "0";
            console.warn("GitHub API did not return repo count:", data);
        }
    })
    .catch(error => {
        console.error("Error fetching GitHub data:", error);
        document.getElementById("githubRepos").innerText = "0";
    });

    /* ===============================
   EXPAND / COLLAPSE LOGIC
================================= */

document.querySelectorAll(".learn-more").forEach(button => {
    button.addEventListener("click", () => {
        const content = button.previousElementSibling;

        if(content.style.maxHeight) {
            content.style.maxHeight = null;
            button.textContent = "Learn More";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            button.textContent = "Show Less";
        }
    });
});


/* ===============================
   SCROLL REVEAL ANIMATION
================================= */

const serviceCards = document.querySelectorAll(".service-card");

function revealOnScroll() {
    serviceCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if(cardTop < window.innerHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
}

serviceCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", revealOnScroll);

/* ===============================
   CASE MODAL LOGIC
================================= */

const modal = document.getElementById("caseModal");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".view-case").forEach(button => {
    button.addEventListener("click", () => {

        document.getElementById("modalTitle").innerText = button.dataset.title;
        document.getElementById("modalProblem").innerText = button.dataset.problem;
        document.getElementById("modalSolution").innerText = button.dataset.solution;
        document.getElementById("modalTech").innerText = button.dataset.tech;
        document.getElementById("modalResult").innerText = button.dataset.result;

        modal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.style.display = "none";
    }
});

const neuralCanvas = document.getElementById("neuralBg");
const nCtx = neuralCanvas.getContext("2d");

function resizeNeural() {
    neuralCanvas.width = neuralCanvas.offsetWidth;
    neuralCanvas.height = neuralCanvas.offsetHeight;
}
resizeNeural();
window.addEventListener("resize", resizeNeural);

let nodes = [];

for (let i = 0; i < 60; i++) {
    nodes.push({
        x: Math.random() * neuralCanvas.width,
        y: Math.random() * neuralCanvas.height,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1
    });
}

function drawNeural() {
    nCtx.clearRect(0,0,neuralCanvas.width, neuralCanvas.height);

    nodes.forEach(node => {
        node.x += node.dx;
        node.y += node.dy;

        if (node.x < 0 || node.x > neuralCanvas.width) node.dx *= -1;
        if (node.y < 0 || node.y > neuralCanvas.height) node.dy *= -1;

        nCtx.beginPath();
        nCtx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        nCtx.fillStyle = "#3b82f6";
        nCtx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i; j < nodes.length; j++) {
            let dx = nodes[i].x - nodes[j].x;
            let dy = nodes[i].y - nodes[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < 120) {
                nCtx.strokeStyle = "rgba(59,130,246,0.2)";
                nCtx.lineWidth = 1;
                nCtx.beginPath();
                nCtx.moveTo(nodes[i].x, nodes[i].y);
                nCtx.lineTo(nodes[j].x, nodes[j].y);
                nCtx.stroke();
            }
        }
    }

    requestAnimationFrame(drawNeural);
}

drawNeural();

// BRAND AI ANALYZER
function analyzeBrand() {

    const brand = document.getElementById("brandInput").value.toLowerCase();
    if (!brand) return;

    let lengthScore = Math.max(0, 100 - Math.abs(brand.length - 8) * 10);
    let vowelCount = brand.match(/[aeiou]/g)?.length || 0;
    let vowelBalance = (vowelCount / brand.length) * 100;

    let uniqueChars = new Set(brand).size;
    let uniqueness = (uniqueChars / brand.length) * 100;

    let memorability = (vowelBalance + uniqueness) / 2;
    let seoStrength = lengthScore;
    let marketImpact = (memorability + seoStrength) / 2;

    let finalScore = Math.round((memorability + seoStrength + marketImpact) / 3);

    animateScore(finalScore);
    updateBars(memorability, seoStrength, marketImpact);
}

function animateScore(score) {
    let current = 0;
    const interval = setInterval(() => {
        if (current >= score) clearInterval(interval);
        document.getElementById("brandScore").innerText = current + "%";
        current++;
    }, 15);
}

function updateBars(mem, seo, impact) {
    document.getElementById("memBar").style.width = mem + "%";
    document.getElementById("seoBar").style.width = seo + "%";
    document.getElementById("impactBar").style.width = impact + "%";
}


// LIVE AI DASHBOARD SIMULATION

const canvas = document.getElementById("aiChart");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = 200;

let points = Array.from({length: 50}, () => Math.random() * 100);

function drawChart() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();

    points.forEach((point, i) => {
        let x = (canvas.width / points.length) * i;
        let y = canvas.height - point * 2;
        if (i === 0) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
    });

    ctx.stroke();

    points.shift();
    points.push(Math.random() * 100);

    requestAnimationFrame(drawChart);
}

drawChart();

setInterval(() => {
    document.getElementById("load").innerText = (Math.random()*100).toFixed(1)+"%";
    document.getElementById("accuracy").innerText = (90 + Math.random()*10).toFixed(2)+"%";
    document.getElementById("nodes").innerText = Math.floor(500 + Math.random()*100);
},1000);

const confCanvas = document.getElementById("confidenceChart");
const cCtx = confCanvas.getContext("2d");

confCanvas.width = confCanvas.offsetWidth;
confCanvas.height = 200;

function generateConfidence() {

    let confidence = 60 + Math.random() * 40;

    cCtx.clearRect(0,0,confCanvas.width, confCanvas.height);

    cCtx.fillStyle = "#1e293b";
    cCtx.fillRect(0, 80, confCanvas.width, 40);

    cCtx.fillStyle = "#10b981";
    cCtx.fillRect(0, 80, (confidence/100)*confCanvas.width, 40);

    cCtx.fillStyle = "white";
    cCtx.font = "20px Arial";
    cCtx.fillText(confidence.toFixed(2) + "% Confidence", 20, 70);
}

const track = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let index2 = 0;
const totalSlides = slides.length;

/* Create Dots */
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => moveToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dots span');

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index2].classList.add('active');
}

function moveToSlide(i) {
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
}

nextBtn.addEventListener('click', () => {
    index2 = (index2 + 1) % totalSlides;
    moveToSlide(index);
});

prevBtn.addEventListener('click', () => {
    index2 = (index2 - 1 + totalSlides) % totalSlides;
    moveToSlide(index2);
});

/* Auto Slide */
setInterval(() => {
    index2 = (index2 + 1) % totalSlides;
    moveToSlide(index2);
}, 5000);

updateDots();