// Puzzle Game State
const gameState = {
    image: null,
    pieces: [],
    gridSize: 4,
    placedPieces: new Set(),
    totalPieces: 0,
};

// DOM Elements
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const previewPlaceholder = document.getElementById('previewPlaceholder');
const gridSizeSelect = document.getElementById('gridSize');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const puzzleContainer = document.getElementById('puzzleContainer');
const piecesHolder = document.getElementById('piecesHolder');
const completionMessage = document.getElementById('completionMessage');
const playAgainBtn = document.getElementById('playAgainBtn');

// Event Listeners
imageUpload.addEventListener('change', handleImageUpload);
startBtn.addEventListener('click', startPuzzle);
resetBtn.addEventListener('click', resetPuzzle);
playAgainBtn.addEventListener('click', playAgain);

/**
 * Handle image upload
 */
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            gameState.image = img;
            displayImagePreview(img);
            startBtn.disabled = false;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

/**
 * Display the uploaded image in preview
 */
function displayImagePreview(img) {
    imagePreview.src = img.src;
    imagePreview.style.display = 'block';
    previewPlaceholder.style.display = 'none';
}

/**
 * Start the puzzle game
 */
function startPuzzle() {
    if (!gameState.image) return;

    gameState.gridSize = parseInt(gridSizeSelect.value);
    gameState.totalPieces = gameState.gridSize * gameState.gridSize;
    gameState.placedPieces = new Set();

    // Generate puzzle pieces
    generatePuzzlePieces();

    // Update UI
    startBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    imageUpload.disabled = true;
    gridSizeSelect.disabled = true;

    // Clear and setup containers
    puzzleContainer.innerHTML = '';
    piecesHolder.innerHTML = '';
    puzzleContainer.classList.add('active');
    piecesHolder.classList.add('active');

    // Display pieces
    displayPuzzlePieces();
}

/**
 * Generate puzzle pieces from the image
 */
function generatePuzzlePieces() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = gameState.image.width;
    canvas.height = gameState.image.height;

    // Draw the image
    ctx.drawImage(gameState.image, 0, 0);

    // Calculate piece dimensions
    const pieceWidth = canvas.width / gameState.gridSize;
    const pieceHeight = canvas.height / gameState.gridSize;

    gameState.pieces = [];

    // Generate pieces
    for (let row = 0; row < gameState.gridSize; row++) {
        for (let col = 0; col < gameState.gridSize; col++) {
            // Create canvas for this piece
            const pieceCanvas = document.createElement('canvas');
            const pieceCtx = pieceCanvas.getContext('2d');

            pieceCanvas.width = pieceWidth;
            pieceCanvas.height = pieceHeight;

            // Draw piece from original image
            pieceCtx.drawImage(
                gameState.image,
                col * pieceWidth,
                row * pieceHeight,
                pieceWidth,
                pieceHeight,
                0,
                0,
                pieceWidth,
                pieceHeight
            );

            gameState.pieces.push({
                canvas: pieceCanvas,
                correctRow: row,
                correctCol: col,
                currentRow: row,
                currentCol: col,
                id: row * gameState.gridSize + col,
            });
        }
    }

    // Shuffle pieces
    gameState.pieces = shuffleArray(gameState.pieces);
}

/**
 * Display puzzle pieces in the holder
 */
function displayPuzzlePieces() {
    piecesHolder.innerHTML = '';

    gameState.pieces.forEach((piece, index) => {
        const pieceWidth = piece.canvas.width;
        const pieceHeight = piece.canvas.height;

        // Calculate display size (responsive)
        const maxSize = 100;
        const scale = Math.min(maxSize / pieceWidth, maxSize / pieceHeight);
        const displayWidth = pieceWidth * scale;
        const displayHeight = pieceHeight * scale;

        // Create piece element
        const pieceElement = document.createElement('div');
        pieceElement.className = 'puzzle-piece';
        pieceElement.draggable = true;
        pieceElement.id = `piece-${index}`;
        pieceElement.style.width = `${displayWidth}px`;
        pieceElement.style.height = `${displayHeight}px`;

        // Draw piece on canvas
        const displayCanvas = document.createElement('canvas');
        displayCanvas.width = displayWidth;
        displayCanvas.height = displayHeight;
        const displayCtx = displayCanvas.getContext('2d');
        displayCtx.drawImage(piece.canvas, 0, 0, displayWidth, displayHeight);

        pieceElement.appendChild(displayCanvas);
        pieceElement.dataset.pieceIndex = index;

        // Add drag events
        pieceElement.addEventListener('dragstart', handleDragStart);
        pieceElement.addEventListener('dragend', handleDragEnd);

        piecesHolder.appendChild(pieceElement);
    });
}

/**
 * Handle drag start
 */
function handleDragStart(e) {
    if (e.target.classList.contains('placed')) {
        e.preventDefault();
        return;
    }

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('pieceIndex', e.currentTarget.dataset.pieceIndex);
    e.currentTarget.style.opacity = '0.5';
}

/**
 * Handle drag end
 */
function handleDragEnd(e) {
    e.currentTarget.style.opacity = '1';
}

/**
 * Handle drag over puzzle container
 */
puzzleContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    puzzleContainer.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
});

puzzleContainer.addEventListener('dragleave', () => {
    puzzleContainer.style.backgroundColor = '';
});

/**
 * Handle drop on puzzle container
 */
puzzleContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    puzzleContainer.style.backgroundColor = '';

    const pieceIndex = parseInt(e.dataTransfer.getData('pieceIndex'));
    const piece = gameState.pieces[pieceIndex];

    if (gameState.placedPieces.has(pieceIndex)) {
        return;
    }

    // Create placed piece element
    const placedPieceElement = createPlacedPiece(piece, pieceIndex);
    puzzleContainer.appendChild(placedPieceElement);

    // Mark piece as placed
    gameState.placedPieces.add(pieceIndex);

    // Update original piece element
    const originalPieceElement = document.getElementById(`piece-${pieceIndex}`);
    originalPieceElement.classList.add('placed');
    originalPieceElement.draggable = false;

    // Check if puzzle is complete
    if (gameState.placedPieces.size === gameState.totalPieces) {
        showCompletionMessage();
    }
});

/**
 * Create a placed piece element
 */
function createPlacedPiece(piece, pieceIndex) {
    const pieceWidth = piece.canvas.width;
    const pieceHeight = piece.canvas.height;

    // Calculate position in grid
    const containerRect = puzzleContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Calculate display size to fit container
    const gridCols = gameState.gridSize;
    const gridRows = gameState.gridSize;

    const displayWidth = containerWidth / gridCols;
    const displayHeight = containerHeight / gridRows;

    // Create placed piece element
    const placedElement = document.createElement('div');
    placedElement.className = 'puzzle-piece placed';
    placedElement.style.position = 'absolute';
    placedElement.style.width = `${displayWidth}px`;
    placedElement.style.height = `${displayHeight}px`;
    placedElement.style.left = `${piece.correctCol * displayWidth}px`;
    placedElement.style.top = `${piece.correctRow * displayHeight}px`;
    placedElement.id = `placed-piece-${pieceIndex}`;

    // Draw piece on canvas
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width = displayWidth;
    displayCanvas.height = displayHeight;
    const displayCtx = displayCanvas.getContext('2d');
    displayCtx.drawImage(piece.canvas, 0, 0, displayWidth, displayHeight);

    placedElement.appendChild(displayCanvas);

    return placedElement;
}

/**
 * Show completion message
 */
function showCompletionMessage() {
    completionMessage.style.display = 'flex';
}

/**
 * Reset puzzle
 */
function resetPuzzle() {
    // Reset game state
    gameState.pieces = [];
    gameState.placedPieces = new Set();

    // Reset UI
    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    imageUpload.disabled = false;
    gridSizeSelect.disabled = false;
    completionMessage.style.display = 'none';

    // Clear containers
    puzzleContainer.innerHTML = '<p class="placeholder">Upload an image to start</p>';
    puzzleContainer.classList.remove('active');
    piecesHolder.innerHTML = '<p class="placeholder">Pieces will appear here</p>';
    piecesHolder.classList.remove('active');
    puzzleContainer.style.backgroundColor = '';

    // Reset file input
    imageUpload.value = '';
}

/**
 * Play again with a new puzzle
 */
function playAgain() {
    completionMessage.style.display = 'none';
    startPuzzle();
}

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
