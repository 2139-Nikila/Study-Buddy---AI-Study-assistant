
# ✦ Study Buddy - An AI Assistant buddy

An AI-powered study dashboard that helps students organize notes, generate quizzes, learn with an AI tutor, and track their learning progress in one place.

## 🚀 Features

### 📚 Notes Management
- Create and save study notes.
- View previously saved notes.
- Delete notes when they are no longer needed.
- Store notes securely using Supabase.

### 🤖 AI Tutor
- Ask questions about different subjects.
- Get AI-generated explanations.
- Choose a subject before asking a question.
- Receive simple and understandable answers.

### 📝 AI Quiz Generator
- Generate quizzes using AI.
- Select a subject and difficulty level.
- Answer multiple-choice questions.
- View explanations for answers.
- Calculate the final score.

### 📊 Progress Tracking
- Track completed quizzes.
- View total questions answered.
- Calculate average quiz score.
- View subject-wise performance.
- Review recent quiz results.

### 🌌 Fantasy Study Dashboard
- Dark magical study-themed interface.
- Responsive layout for desktop and mobile.
- Easy navigation through the sidebar.
- Personalized study dashboard.

## 🛠️ Technologies Used

- **Next.js** – React framework for building the application
- **React** – Frontend user interface
- **JavaScript** – Application logic
- **Tailwind CSS** – Styling and responsive design
- **Supabase** – Database and data storage
- **Google Gemini API** – AI-powered tutor and quiz generation
- **Vercel** – Deployment platform

## 📂 Project Structure

```text
ai-study-assistant/
│
├── public/
│   └── images/
│       └── study-background.png
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── quiz/
│   │   │   └── tutor/
│   │   ├── notes/
│   │   ├── progress/
│   │   ├── quizzes/
│   │   ├── tutor/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── QuizApp.js
│   │   ├── Sidebar.js
│   │   └── TutorApp.js
│   │
│   └── lib/
│       └── supabase.js
│
├── .env.local
├── package.json
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd ai-study-assistant
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a file named `.env.local` in the project root.

Add the required Supabase and Gemini API keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

> Never upload `.env.local` or expose your API keys publicly.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database

This project uses Supabase with the following tables:

### `notes`

Stores the user's study notes.

### `quiz_results`

Stores quiz scores and performance details.

The database allows notes and quiz results to remain available even after refreshing the application.

## 🧪 Available Commands

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run the code linter:

```bash
npm run lint
```

## 🔐 Security

- API keys are stored in environment variables.
- Secret keys are not included directly in the source code.
- Supabase is used for persistent data storage.
- The Gemini API is accessed through Next.js API routes.

## 🎯 Future Improvements

- User authentication and individual student accounts.
- Upload and summarize PDF notes.
- Voice-based AI tutor.
- Flashcard generation.
- Study reminders and notifications.
- More detailed progress charts.
- Personalized study recommendations.
- Dark and light theme selection.

## 👩‍💻 Author

**Niki**

AI Study Assistant — A smart learning companion for students.

## 📄 License

This project is created for educational and project demonstration purposes.