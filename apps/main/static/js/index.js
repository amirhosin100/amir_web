// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-800/80', 'shadow-lg');
    } else {
        navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-md', 'border-b', 'border-slate-800/80', 'shadow-lg');
    }
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Background Interactive Canvas Animation (Tech / Network Nodes)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 15000);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

initParticles();

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

// Interactive Terminal Playground
const terminalInput = document.getElementById('terminal-input');
const terminalWindow = document.getElementById('terminal-window');

const commands = {
    help: "Available commands:\n  - about     : Summary of Amirhossein\n  - skills    : List core skills & stack\n  - python    : Python proficiency details\n  - contact   : Get contact information\n  - clear     : Clear the terminal window\n  - date      : Show current timestamp",
    about: "Amirhossein Mirjamali — Backend Developer with 1+ years of experience specializing in robust API design, Django, and scalable backend infrastructure.",
    skills: "Core Stack:\n  • Backend: Python (OOP, Asyncio), Django, REST APIs\n  • Data: PostgreSQL, SQL, Redis\n  • DevOps: Docker, Linux\n  • Frontend: HTML, CSS, JavaScript, Vue.js",
    python: "Python Expertise:\n  • Strong Object-Oriented Programming (OOP) principles\n  • Asynchronous programming (asyncio / async workflows)\n  • High-performance web backend development with Django & FastAPI",
    contact: "Email: thea9n@gmail.com\nGitHub: github.com/amirhosin100\nLinkedIn: linkedin.com/in/amirhossein404",
    date: new Date().toUTCString()
};

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        
        // Append user command
        const userLine = document.createElement('div');
        userLine.innerHTML = `<span class="text-emerald-400">guest@amirhossein:~$</span> ${escapeHtml(terminalInput.value)}`;
        terminalWindow.appendChild(userLine);

        if (cmd === 'clear') {
            terminalWindow.innerHTML = '';
        } else if (commands[cmd]) {
            const resLine = document.createElement('div');
            resLine.className = 'text-indigo-300 whitespace-pre-line';
            resLine.textContent = commands[cmd];
            terminalWindow.appendChild(resLine);
        } else if (cmd !== '') {
            const errLine = document.createElement('div');
            errLine.className = 'text-rose-400';
            errLine.textContent = `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
            terminalWindow.appendChild(errLine);
        }

        terminalInput.value = '';
        terminalWindow.scrollTop = terminalWindow.scrollHeight;
    }
});

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}