// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 1500);
});

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

// Search Toggle
function toggleSearch() {
    const searchBar = document.querySelector('.search-bar');
    searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
}

// Hero Background Switcher & Parallax
const backgrounds = ['cityscape.jpg', 'ai-lab.jpg', 'gadget.jpg'];
let currentBg = 0;
function switchBackground() {
    currentBg = (currentBg + 1) % backgrounds.length;
    document.getElementById('hero-bg').style.backgroundImage = `url(${backgrounds[currentBg]})`;
}
setInterval(switchBackground, 10000);
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    document.getElementById('hero-bg').style.transform = `translateY(${scrollPos * 0.3}px)`;
});

// Scroll Progress & Back to Top
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const width = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-progress').style.width = `${width}%`;
    document.querySelector('.back-to-top').classList.toggle('visible', scrollTop > 200);
});
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Full-Screen Menu
function toggleMenu() {
    const menu = document.getElementById('full-menu');
    menu.classList.toggle('active');
    menu.querySelectorAll('a').forEach((link, i) => link.style.setProperty('--i', i));
}

// Interactive Cards
function toggleSave(icon) {
    icon.classList.toggle('saved');
    icon.textContent = icon.classList.contains('saved') ? '★' : '☆';
    const title = icon.parentElement.querySelector('h2').textContent;
    let saved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    if (icon.classList.contains('saved')) {
        saved.push(title);
    } else {
        saved = saved.filter(t => t !== title);
    }
    localStorage.setItem('savedArticles', JSON.stringify(saved));
}
function openShareModal() {
    document.getElementById('share-modal').style.display = 'block';
}
function closeShareModal() {
    document.getElementById('share-modal').style.display = 'none';
}
function filterArticles(category) {
    document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
    event.target.classList.add('active');
    fetch(`/api/articles?category=${category}`)
        .then(res => {
            if (!res.ok) throw new Error('Server error');
            return res.json();
        })
        .then(articles => {
            const grid = document.querySelector('.grid');
            grid.innerHTML = '';
            articles.forEach((article, i) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.animationDelay = `${i * 0.1}s`;
                card.innerHTML = `
                    <img src="${article.image}" alt="Article" loading="lazy">
                    <h2>${article.title}</h2>
                    <p>${article.summary}</p>
                    <span class="read-time">3 min</span>
                    <a href="#" class="read-more">Read More</a>
                    <span class="save-icon" onclick="toggleSave(this)">☆</span>
                    <span class="share-icon" onclick="openShareModal(this)">↗</span>
                `;
                grid.appendChild(card);
            });
        })
        .catch(err => {
            const grid = document.querySelector('.grid');
            grid.innerHTML = '<p>Sorry, articles couldn’t load. Please refresh the page.</p>';
            console.error('Filter error:', err);
        });
}

// Newsletter Popup & Sidebar Subscription
setTimeout(() => {
    document.getElementById('newsletter-popup').classList.add('active');
}, 10000);
function minimizePopup() {
    document.getElementById('newsletter-popup').classList.toggle('minimized');
}
function subscribe() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        const email = input.value.trim();
        if (!email) {
            alert('Please enter an email address.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(res => {
            if (!res.ok) throw new Error('Server error');
            return res.json();
        })
        .then(data => {
            alert(data.message);
            input.value = '';
        })
        .catch(err => {
            alert('Subscription failed. Please try again later!');
            console.error('Subscribe error:', err);
        });
    });
}

// Category Spotlight
const categories = ['AI Spotlight', 'Startup Spotlight', 'Gadget Spotlight'];
let currentCat = 0;
setInterval(() => {
    currentCat = (currentCat + 1) % categories.length;
    document.querySelector('.spotlight span').textContent = categories[currentCat];
}, 15000);

// Carousel
let currentSlide = 0;
function setCarousel(index) {
    currentSlide = index;
    document.getElementById('carousel').style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}
setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    setCarousel(currentSlide);
}, 8000);

// Sidebar Trending Updates
const trendingItems = [
    'Holographic Phones Drop Now', 'AI Chips Break Limits', 'Drones Rule Skies Quietly',
    'Solar Nanotech Sparks Future', 'Emotion Tech Stirs Debate', 'Quantum Leap Forward',
    'AR Glasses Teased', 'Smart Cities Rise', 'Neural Links Advance', 'Gadget Hype Peaks'
];
let trendingIndex = 5;
setInterval(() => {
    const list = document.getElementById('trending');
    const item = list.children[0];
    item.style.opacity = 0;
    setTimeout(() => {
        item.remove();
        const newItem = document.createElement('li');
        newItem.textContent = trendingItems[trendingIndex % trendingItems.length];
        list.appendChild(newItem);
    }, 500);
}, 15000);

// Footer Easter Egg
function triggerEasterEgg() {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'trail';
        particle.style.left = `${event.pageX}px`;
        particle.style.top = `${event.pageY}px`;
        particle.style.transform = `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px)`;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// Contact Form Submission
function submitContact(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const formData = new FormData(form);
    const data = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        message: formData.get('message').trim()
    };

    if (!data.name || !data.email || !data.message) {
        feedback.textContent = 'Please fill out all fields.';
        return;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
        feedback.textContent = 'Please enter a valid email address.';
        return;
    }

    fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error('Server error');
        return res.json();
    })
    .then(data => {
        feedback.textContent = data.message;
        form.reset();
        setTimeout(() => feedback.textContent = '', 3000);
    })
    .catch(err => {
        feedback.textContent = 'Oops, something went wrong. Please try again later!';
        console.error('Contact error:', err);
    });
}

// Mouse Trail
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'trail';
        trail.style.left = `${e.pageX - 5}px`;
        trail.style.top = `${e.pageY - 5}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    });
}

// Initial Article Load
filterArticles('all');