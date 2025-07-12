🧠 Skill Swap Platform
A peer-to-peer skill exchange platform built to empower learners through mutual collaboration and community-driven learning, without the involvement of money. Whether you're a teacher, learner, or both — this platform connects you with the right people to exchange knowledge and grow together.

📌 Selected Problem Statement
We selected the first problem statement:

🔄 Skill Swap Platform
Build a system that enables users to exchange skills without monetary transactions. The platform should allow users to list skills they can teach, skills they want to learn, and match them with others for mutual learning.

This problem promotes inclusive education, community empowerment, and digital skill-sharing, aligning well with our team’s vision.

👨‍💻 About the Team – TechCoders
We are Team TechCoders, a passionate group of student developers committed to building meaningful tech solutions. Each of us contributed equally in designing, developing, and refining the platform.

👤 Team Leader
Pramod Khatik – Full-stack developer, system designer, project coordinator

👥 Team Members
Krishu Patel – Frontend developer, UI/UX designer

Manish Giakwad – Backend developer, database manager

🎯 Objective
To create a platform where:

People can teach skills they know

Learn new skills from others


✨ Key Features
Feature	Description
🔐 User Authentication	Secure registration and login system with session management
👤 Profile Management	Users can list skills to teach and learn, add bio, and manage availability
🧠 Matching Algorithm	Smart matchmaking based on complementary skill sets
🔁 Skill Swap Requests	Send, accept, or reject requests to swap skills
📩 Notifications	Alerts for swap requests, confirmations, and updates
📅 Scheduling (Planned)	Schedule learning sessions with availability check
⭐ Feedback & Ratings	Rate sessions after completion to build credibility
🧑‍💼 Admin Dashboard (Future)	Manage users, handle complaints, and review flagged content

🔧 Tech Stack
📱 Frontend
HTML, CSS, JavaScript (React/Vue)

Responsive UI for mobile and desktop

Clean and user-friendly interface

⚙️ Backend
Python with Flask
REST API with secure endpoints
Session handling and data validation

🗃️ Database
MongoDB via PyMongo

Collections for users, skills, requests, feedback, etc.

📦 Tools & Libraries
Flask, PyMongo, bcrypt, JWT (authentication)

npm (frontend packages)

Git, GitHub (version control)

🖥️ Installation & Setup Guide
✅ Prerequisites
Python 3.8 or above

Node.js & npm (for frontend)

MongoDB (local or cloud via MongoDB Atlas)

Git installed

🔙 Backend Setup

# Step into the backend directory
cd project/backend/

# Install Python dependencies
pip install -r requirements.txt

# Create a `.env` file and add:
# MONGO_URI=<your_mongo_connection_string>
# SECRET_KEY=<your_secret_key>

# Run the server
python server.py
The backend runs at: http://localhost:5000

🌐 Frontend Setup

# Step into the frontend directory
cd project/frontend/

# Install dependencies
npm install

# Start the frontend server
npm run dev
The frontend runs at: http://localhost:3000

📁 Project Structure

Skill-Swap-Platform/
├── project/
│   ├── backend/
│   │   ├── server.py
│   │   ├── routes/
│   │   ├── models/
│   │   ├── config/
│   │   └── requirements.txt
│   ├── frontend/
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
├── README.md
└── .gitignore

🧪 How It Works – Flow

User signs up and creates a profile

Lists skills they can teach and skills they want to learn

System matches users based on complementary needs

Users send and accept swap requests

Session happens online/offline

Both users rate each other after completion

🔮 Future Enhancements
Feature	Status
📅 Integrated session scheduler	Coming soon
💬 In-app messaging/chat	Planned
🎥 Video integration (Zoom, Jitsi)	Planned
🌍 Location-based matching	Planned
🏆 Gamification (XP, badges)	Planned
🌐 Multilingual support	Planned
🧠 AI-powered recommendations	Planned
📊 Analytics Dashboard (Admin)	Planned

🧑‍💻 Contributing
We welcome community contributions! Here’s how to get started:

Fork the repository

Clone your fork:
git clone https://github.com/your-username/Skill-Swap-Platform.git

Create a new branch:
git checkout -b feature/YourFeature

Make changes and commit:
git commit -m "Added new feature"

Push changes:
git push origin feature/YourFeature

Open a Pull Request


📬 Contact Us
For queries, suggestions, or collaborations, reach out to:

👨‍💼 Pramod Khatik
GitHub: Pramod838

🙌 Acknowledgments
Special thanks to all mentors, reviewers, and hackathon organizers who encouraged us to take this idea forward.

“Empower yourself by empowering others – let’s swap skills and grow together.”
