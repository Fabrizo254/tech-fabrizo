const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve images and static files from root

const articles = [
    { title: "Safaricom’s 5G Expands to Rural Kenya", category: "gadgets", summary: "Safaricom’s 5G network now covers 20 counties, boosting connectivity for remote businesses.", image: "safaricom-5g.jpg" },
    { title: "Ushahidi Unveils AI-Driven Mapping", category: "ai", summary: "Nairobi-based Ushahidi launches an AI tool to map crises in real-time.", image: "ushahidi-ai.jpg" },
    { title: "M-KOPA Solar Powers 1M Homes", category: "startups", summary: "M-KOPA’s pay-as-you-go solar hits a milestone, lighting up rural Kenya.", image: "mkopa-solar.jpg" },
    { title: "Twiga Foods Raises $50M", category: "startups", summary: "Kenyan agritech startup Twiga secures funding to scale food distribution.", image: "twiga-foods.jpg" },
    { title: "BRCK’s Moja WiFi Goes Nationwide", category: "gadgets", summary: "BRCK’s free WiFi network expands across Kenyan urban centers.", image: "brck-wifi.jpg" },
    { title: "iHub Launches AI Incubator", category: "ai", summary: "Nairobi’s iHub opens a hub for AI startups with global backing.", image: "ihub-ai.jpg" },
    { title: "Airtel Kenya Rolls Out IoT for Smart Farming", category: "gadgets", summary: "Airtel’s new IoT platform helps farmers monitor crops with real-time data.", image: "airtel-iot.jpg" },
    { title: "Kenya’s Andela Trains 10K AI Coders", category: "ai", summary: "Andela’s latest program aims to upskill Kenya’s youth in AI development.", image: "andela-ai.jpg" },
    { title: "Sendy Pivots to Electric Delivery Fleet", category: "startups", summary: "Sendy launches Kenya’s first all-electric logistics network in Nairobi.", image: "sendy-electric.jpg" },
    { title: "Jua Kenya Unveils Solar-Powered Drone", category: "gadgets", summary: "Local startup Jua debuts a drone for rural deliveries, powered by solar energy.", image: "jua-drone.jpg" },
    { title: "Nairobi’s Twende App Hits 1M Rides", category: "startups", summary: "Twende, Kenya’s homegrown ride-hailing app, surpasses 1 million trips.", image: "twende-rides.jpg" },
    { title: "AI Judiciary System Debuts in Kenya", category: "ai", summary: "Kenya’s courts test an AI tool to speed up case backlogs, sparking debate.", image: "ai-judiciary.jpg" }
];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html'))); // Serve index.html

app.get('/api/articles', (req, res) => {
    const { category } = req.query;
    const filtered = category && category !== 'all'
        ? articles.filter(a => a.category === category)
        : articles;
    res.json(filtered);
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'All fields required' });
    res.json({ message: `Thanks, ${name}! Your message was sent.` });
});

app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    res.json({ message: `Subscribed with ${email}!` });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port ${port}`));