# 🛡 SentinelX — AI-Powered Intrusion Detection System

⚡ A real-time cybersecurity system that captures live network traffic, detects intrusions using Machine Learning, and visualizes everything through a modern cyber-style dashboard.

---

## 🌟 Overview

SentinelX is a full-stack Intrusion Detection System (IDS) designed to monitor network traffic in real-time and detect malicious activities.

It integrates:
- Live packet capture using Scapy
- Machine Learning-based classification
- Node.js backend for processing
- React dashboard for visualization

---

## 🚀 Features

- 🔍 Real-time packet capture
- 🤖 Machine Learning-based threat detection
- 🚨 Suspicious activity alerts
- 📈 Live threat trend visualization
- 🥧 Traffic distribution (Safe vs Threats)
- 🔥 Top attacker identification
- ⚡ Live activity feed with filtering
- 🎨 Cyber-style modern UI

---

## 🏗️ Tech Stack

Frontend:
- React.js
- Chart.js
- CSS (Cyber UI Design)

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)

AI / Networking:
- Python
- Scapy
- Scikit-learn

---

## 📂 Project Structure

Net_ml/
│
├── Backend/
│   ├── server.js
│   ├── db/
│   │   ├── connection.js
│   │   └── schema.js
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│
├── ids.py
├── model.pkl        (ignored)
├── log.txt          (ignored)
├── .gitignore
├── README.md

---

## ⚙️ How It Works

1. Packet Capture  
   Scapy captures live network packets.

2. Feature Extraction  
   Extracts protocol, packet size, and other metadata.

3. ML Prediction  
   Classifies traffic as:
   - Normal
   - Suspicious

4. Attack Detection  
   Detects patterns like SYN flood attacks.

5. Backend Processing  
   Sends packet data to Node.js server and stores in MongoDB.

6. Frontend Visualization  
   React dashboard fetches and displays real-time insights.

---

## 🖥️ Setup Instructions

### 1. Clone Repository
git clone https://github.com/Manleen123-dev/Sentinel-X.git
cd Sentinel-X

---

### 2. Backend Setup
cd Backend
npm install
node server.js

Runs on: http://localhost:3000

---

### 3. Frontend Setup
cd Frontend
npm install
npm run dev

Runs on: http://localhost:5173

---

### 4. Python IDS
pip install scapy requests
python ids.py

Note: Run as administrator for packet sniffing.

---

## 📊 Dashboard

The dashboard provides:
- Real-time threat monitoring
- Interactive charts
- Traffic distribution
- Live logs and filtering

---

## ⚠️ Notes

- model.pkl and log.txt are ignored using .gitignore
- node_modules is not included in repository
- Designed for local real-time monitoring

---

## 🚀 Future Improvements

- WebSocket-based real-time updates
- Geo-location tracking of attackers
- Sound alerts for threats
- Cloud deployment (AWS / Docker)

---

## 🎯 Learning Outcomes

- Real-time system design
- Full-stack development
- Machine Learning integration
- Network packet analysis
- Data visualization

---

## 👤 Author

Manleen Kaur

---

## ⭐ Support

If you like this project, give it a star ⭐ on GitHub.

