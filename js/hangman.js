// Wait for the DOM content to be loaded 
document.addEventListener('DOMContentLoaded', function () {
    // Array of words to choose from
    const words = ["AGGIES", "CAMPUS", "FARM", "RESEARCH", "COMMUNITY", "EDUCATION"];

    // Randomly select a word from the array
    const word = words[Math.floor(Math.random() * words.length)];

    // Convert the word into an array of characters
    const wordArray = word.split('');

    // Array to store guessed letters
    let guesses = [];

    // Array to store incorrectly guessed letters
    let incorrectGuesses = [];

    // DOM elements
    const wordDisplay = document.getElementById('wordDisplay');
    const guessesDisplay = document.getElementById('guesses');
    const chancesDisplay = document.getElementById('chances');
    const messageDisplay = document.getElementById('message');
    const keyboard = document.getElementById('keyboard');
    const hintButton = document.getElementById('easy'); 

    // Display the word with guessed letters and underscores
    function displayWord() {
        displayGuesses(); // Update the display of incorrect guesses
        let display = '';
        for (let i = 0; i < wordArray.length; i++) {
            if (guesses.includes(wordArray[i])) {
                display += wordArray[i] + ' ';
            } else {
                display += '_ ';
            }
        }
        wordDisplay.textContent = display; // Update the displayed word
    }

    // Display incorrect guesses
    function displayGuesses() {
        incorrectGuesses = guesses.filter(guess => !wordArray.includes(guess));
        guessesDisplay.textContent = 'Incorrect guesses: ' + incorrectGuesses.join(', ');
        chancesDisplay.textContent = 'Chances remaining: ' + (6 - incorrectGuesses.length); // Update chances remaining
    }

    // Check the current game state (win or loss)
    function gameState() {
        if (checkWin()) {
            messageDisplay.textContent = 'Congratulations! You won!';
            return true;
        } else if (checkLoss()) {
            messageDisplay.textContent = 'Sorry, you lost. The word was: ' + word;
            return true;
        }
        return false;
    }

    // Check if the player has won
    function checkWin() {
        return wordArray.every(letter => guesses.includes(letter));
    }
    
    // Check if the player has lost
    function checkLoss() {
        return incorrectGuesses.length >= 6;
    }

    // Event handler for when a letter button is clicked
    function handleClick(event) {
        const letter = event.target.textContent;
        if (!gameState()) { // If the game is still ongoing
            guesses.push(letter); 
            displayGuesses(); 
            displayWord(); 
            gameState(); // Check the game state for win or loss
            event.target.disabled = true; // Disable the button after it's been clicked
        }
    }

    // Event handler for when the hint button is clicked
    function handleHint() {
        if (!gameState()) { // If the game is still ongoing
            let unrevealedLetters = wordArray.filter(letter => !guesses.includes(letter));
            if (unrevealedLetters.length > 0) {
                const randomIndex = Math.floor(Math.random() * unrevealedLetters.length);
                const letterToReveal = unrevealedLetters[randomIndex];
                guesses.push(letterToReveal);
                displayWord();
            }
        }
    }

    // Generate buttons for each letter of the alphabet
    function generateAlphabetButtons() {
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', handleClick);
            keyboard.appendChild(button); // Add button to the keyboard container
        }
    }

    generateAlphabetButtons(); // Initial game keyboard
    hintButton.addEventListener('click', handleHint); // Add event listener to the hint button
    displayWord(); // Initial display
});
