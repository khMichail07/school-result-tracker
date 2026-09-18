# School Result Tracker

A modern, responsive school result tracking system built with React, Vite, and Tailwind CSS.

## Features

- ✨ Add and manage students
- 📊 Track exam results and grades
- 🎯 Calculate percentages and grades automatically
- 📈 View overall performance statistics
- 🔍 Search and filter students
- 💾 Persistent data storage (localStorage)
- 🎨 Beautiful, modern UI with smooth animations
- 📱 Fully responsive design

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **localStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Adding a Student

1. Click the "Add Student" button
2. Fill in the student details (name, class, roll number, email)
3. Click "Add Student" to save

### Adding Exam Results

1. Click "Add Result" on a student card
2. Enter exam name and date
3. Add subjects with obtained marks and total marks
4. You can add multiple subjects using the "Add Subject" button
5. Click "Add Result" to save

### Viewing Details

- Click "View Details" on any student card to see all their exam results
- The details view shows overall performance and individual exam breakdowns

### Searching

Use the search bar to filter students by name, class, or roll number.

## Grading System

- A+ : 90% and above
- A  : 80% - 89%
- B+ : 70% - 79%
- B  : 60% - 69%
- C  : 50% - 59%
- D  : 40% - 49%
- F  : Below 40%

## Data Persistence

All data is automatically saved to your browser's localStorage. Your data will persist across sessions unless you clear your browser data.

## Project Structure

```
src/
├── components/
│   ├── StudentForm.jsx      # Form to add new students
│   ├── ResultForm.jsx       # Form to add exam results
│   ├── StudentCard.jsx      # Student card display
│   └── StudentDetails.jsx   # Detailed student view
├── utils/
│   └── helpers.js           # Utility functions
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css                # Global styles

```

## Customization

### Changing the Grading Scale

Edit the `calculateGrade` function in `src/utils/helpers.js`

### Modifying Colors

The color scheme uses Tailwind CSS. You can customize colors in `tailwind.config.js` or directly in component classes.

### Fonts

The project uses Outfit (display) and Inter (body) from Google Fonts. Change these in `index.html` and `tailwind.config.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
