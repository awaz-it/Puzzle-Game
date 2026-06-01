# Multimedia Puzzle Game

A fun, interactive web-based puzzle game where users upload an image and solve a customizable jigsaw puzzle by dragging and dropping pieces.

## Project Structure

```
puzzle/
├── puzzle.html         # Main HTML file with UI structure
├── style.css           # Complete styling and responsive design
├── script.js           # Game logic and interactivity
└── README.md           # This file
```

## Features

✨ **Key Features:**
- 🖼️ Upload any image from your computer
- 🔲 Choose puzzle difficulty: 3x3 (Easy) or 4x4 (Medium)
- 🎮 Drag-and-drop puzzle piece placement
- 📱 Fully responsive design (works on desktop, tablet, mobile)
- 🎉 Completion message when puzzle is solved
- 🔄 Reset and play again functionality
- 💅 Modern, clean UI with smooth animations

## How to Run

### Option 1: Using a Local Server (Recommended)

1. **Using Python:**
   ```bash
   # Python 3.x
   python -m http.server 8000
   
   # Or Python 2.x
   python -m SimpleHTTPServer 8000
   ```

2. **Using Node.js (with http-server):**
   ```bash
   npm install -g http-server
   http-server
   ```

3. **Using Live Server (VS Code Extension):**
   - Install "Live Server" extension in VS Code
   - Right-click on `puzzle.html` → "Open with Live Server"

4. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Option 2: Direct File Open (Simpler)

1. Open the `puzzle.html` file directly in your web browser:
   - Double-click the `puzzle.html` file, OR
   - Right-click → "Open with" → Choose your browser

## How to Play

1. **Upload Image:**
   - Click "Choose an Image" button
   - Select any image file from your computer (PNG, JPG, etc.)

2. **Select Difficulty:**
   - Choose between "3x3 (Easy)" or "4x4 (Medium)"
   - 3x3 = 9 pieces, 4x4 = 16 pieces

3. **Start Puzzle:**
   - Click the "Start Puzzle" button
   - The image will be divided into pieces and shuffled

4. **Solve the Puzzle:**
   - Click and drag puzzle pieces from the "Puzzle Pieces" section
   - Drop them into the "Puzzle Area"
   - Pieces snap to their correct positions automatically
   - The "Original Image" shows you what the final puzzle should look like

5. **Complete:**
   - When all pieces are placed, a celebration message appears!
   - Click "Play Again" to shuffle and restart, or "Reset" to upload a new image

## Technical Details

### Technologies Used
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, animations, and responsive grid layout
- **JavaScript (ES6+)**: Game logic and DOM manipulation

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser supporting:
  - HTML5 Canvas API
  - Drag and Drop API
  - FileReader API

### Key JavaScript Features
- Canvas API for image manipulation and piece generation
- Drag and Drop API for piece placement
- Fisher-Yates shuffle algorithm for randomization
- Responsive grid layout with CSS Grid

## File Descriptions

### puzzle.html
- Main markup with semantic HTML5 structure
- Three-column layout: Image Preview | Puzzle Area | Pieces Holder
- Control section for file upload and puzzle size selection
- Completion message modal

### style.css
- Gradient background with modern design
- Flexbox and CSS Grid for layout
- Smooth animations and transitions
- Mobile-first responsive design
- Piece styling with hover and active states
- Print-friendly media queries

### script.js
- Game state management
- Image upload and preview handling
- Puzzle piece generation using Canvas API
- Drag-and-drop event handling
- Piece placement and validation
- Completion detection
- Reset and replay functionality

## Tips for Best Experience

1. **Image Size:** Use images between 300x300px and 1200x1200px for best results
2. **Image Type:** Works with PNG, JPG, GIF, WebP, and other common formats
3. **Difficulty:** Start with 3x3 for casual play, try 4x4 for more challenge
4. **Piece Placement:** Pieces automatically snap to correct positions - just drag and drop
5. **Mobile:** Works on touch devices - just tap and drag pieces

## Customization

### Change Difficulty Levels

Edit the `<select>` element in `puzzle.html`:
```html
<select id="gridSize">
    <option value="2">2x2 (Very Easy)</option>
    <option value="3">3x3 (Easy)</option>
    <option value="4" selected>4x4 (Medium)</option>
    <option value="5">5x5 (Hard)</option>
</select>
```

### Change Colors

Edit the primary color in `style.css`:
```css
/* Change from #667eea to your preferred color */
--primary-color: #667eea;
```

### Modify Piece Size

In `script.js`, find the `displayPuzzlePieces()` function:
```javascript
const maxSize = 100; // Change this value (pixels)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Image not uploading | Ensure the file is a valid image format (PNG, JPG, etc.) |
| Pieces not appearing | Try using a different image or refreshing the page |
| Drag and drop not working | Make sure you're using a modern browser |
| Layout broken on mobile | Try rotating your device or using a larger screen |
| CORS errors with local server | Use a local server (Python/Node.js) instead of direct file open |

## License

Free to use and modify for personal and educational purposes.

## Support

For issues or suggestions:
1. Check browser console for errors (F12 → Console)
2. Ensure all three files (HTML, CSS, JS) are in the same directory
3. Try with a different image file
4. Clear browser cache and reload

---

**Enjoy your puzzle game! 🧩**
