# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Literacy Test web application built with Next.js that helps users identify AI-generated content from human-created content. The app uses a **Tinder-style interface** where users view one piece of content at a time and choose between "AI Generated" or "Human Created" buttons.

## Architecture

- **Framework**: Next.js 15 with Pages Router (not App Router)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Language**: JavaScript (no TypeScript)
- **Content**: Korean language interface with hardcoded quiz data
- **UI Pattern**: Tinder-style single-content display with binary choice buttons

### Key Components

- **Quiz Engine**: State-managed quiz flow in `pages/index.js` using React hooks
- **Question Types**: Image and text content displayed one at a time
- **Answer System**: "AI" vs "human" binary choice with instant feedback
- **Progress Tracking**: Visual progress bar and question counter
- **Scoring System**: Simple correct/incorrect scoring with detailed explanations
- **Social Sharing**: Native Web Share API with clipboard fallback
- **Mobile-First Design**: Optimized for mobile with large touch-friendly buttons

### File Structure

- `pages/index.js` - Main quiz application with all logic
- `pages/api/hello.js` - Basic API route (template, unused)
- `styles/globals.css` - Global styles with Tailwind CSS v4 and CSS variables
- `jsconfig.json` - Path aliases configuration (`@/*` maps to root)

## Development Commands

### Core Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Development Server
- Runs on http://localhost:3000
- Hot reloading enabled for all file changes

## Key Technical Details

### Quiz Data Structure
Questions are dynamically generated from folder structure in `pages/index.js`:
- `generateQuestions()`: Function that creates questions from image folders
- `id`: Question identifier (1-10)
- `type`: Always "image" (text questions removed)
- `content`: Image path from folder structure
- `answer`: Correct answer ("AI" or "human")
- No explanation field (removed for simplicity)

### State Management
Uses React's `useState` for:
- `step`: Current screen ("intro", "quiz", "result")
- `current`: Current question index
- `score`: User's score
- `selected`: User's current selection ("AI" or "human")
- `showResultIcon`: O/X feedback display ("O" or "X")

### Image Assets
Images are organized in folder structure:
- `/public/ai-creation/`: AI-generated images (image1.jpg to image5.jpg)
- `/public/human-creation/`: Human-created images (image1.jpg to image5.jpg)
- Questions are randomly shuffled each session

### User Flow
1. **Intro Screen**: Welcome message and start button
2. **Quiz Screen**: 
   - Single image display only
   - Two buttons: "🤖 AI 생성" and "👨‍💻 인간 창작"
   - Instant O/X feedback (no explanation)
   - Auto-progression after 1 second
3. **Result Screen**: Score display with social sharing options

### Styling Architecture
- Tailwind CSS v4 with inline theme configuration
- CSS variables for theming (supports dark mode)
- Responsive design using Tailwind's grid system

## Important Notes

- No TypeScript - all files are JavaScript
- Korean language content throughout
- Images are hardcoded references (not dynamically loaded)
- Uses Pages Router, not App Router
- No external API dependencies
- Advertisement placeholders included for future monetization