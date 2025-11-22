# MediPredict - Disease Prediction Web App

AI-powered disease prediction system built with Next.js, TypeScript, and Machine Learning.

## Features

- 🧠 AI-powered symptom analysis
- 📱 Fully responsive design
- ⚡ Fast predictions using Random Forest model
- 🎨 Clean and modern UI
- 🔍 Symptom search functionality

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **ML Models**: Random Forest, Decision Tree, Naive Bayes, Gradient Boosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.9+ (for ML predictions)
- pnpm (or npm/yarn)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Make sure the ML model is available at `../saved_model/random_forest.joblib`

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Configure Python runtime for API routes
4. Deploy!

## Important Notes

⚠️ **Educational purposes only** - Always consult a healthcare professional for medical advice.

## License

MIT
