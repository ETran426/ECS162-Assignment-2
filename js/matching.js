// Wait for the DOM content to be loaded 
document.addEventListener('DOMContentLoaded', function () {
    // Array of image URLs
    const imageUrls = [
        "matching_img/cow.png",
        "matching_img/bike.png",
        "matching_img/farmer.png",
        "matching_img/grape.png",
        "matching_img/bus.png",
        "matching_img/logo.png",
        "matching_img/tree.png",
        "matching_img/uc-logo-gold.png",
    ];
    let openBoxes = []; // Array to keep track of opened boxes

    // Create the game
    function createGame() {
        const images = imageUrls.concat(imageUrls); // Duplicate each image URL to ensure pairs
        shuffleArray(images); // Shuffle the array of image URLs

        // Loop through each image URL to create game boxes
        for (let i = 0; i < images.length; i++) {
            const box = createBox(images[i]);
            document.querySelector('.game').appendChild(box); // Append the box to the game container
        }
    }

    // Create a game box
    function createBox(imageUrl) {
        const box = document.createElement('div');
        box.className = 'item'; // Set class name for the box
        const img = document.createElement('img');
        img.src = imageUrl; // Set the image source
        img.className = 'item-img'; // Set class name for the image
        box.appendChild(img); // Append the image to the box

        // Add click event handler to each box
        box.onclick = function () {
            // Check if the box is not already open and there are less than 2 open boxes
            if (!box.classList.contains('boxOpen') && openBoxes.length < 2) {
                box.classList.add('boxOpen'); // Mark the box as open
                openBoxes.push(box); // Add the box to the list of open boxes

                // Check if two boxes are open
                if (openBoxes.length === 2) {
                    setTimeout(function () {
                        checkMatch(); // Check if the images in the open boxes match after a delay
                    }, 500);
                }
            }
        };

        return box;
    }

    // Check if the opened boxes match
    function checkMatch() {
        if (openBoxes[0].querySelector('.item-img').src === openBoxes[1].querySelector('.item-img').src) {
            // Mark the boxes as matched if images match
            openBoxes.forEach(box => box.classList.add('boxMatch'));
            openBoxes = []; // Reset the list of open boxes

            // Check if all boxes are matched to display winning message
            if (document.querySelectorAll('.boxMatch').length === imageUrls.length * 2) {
                const messageDisplay = document.getElementById('message');
                messageDisplay.textContent = 'Congratulations! You won!';
            }
        } else {
            // If images don't match, close both boxes
            openBoxes.forEach(box => box.classList.remove('boxOpen'));
            openBoxes = []; // Reset the list of open boxes
        }
    }

    // Shuffle an array
    // https://medium.com/@khaledhassan45/how-to-shuffle-an-array-in-javascript-6ca30d53f772
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    createGame(); // Initialize the game

    // Event listener for the "easy" button
    document.getElementById('easy').addEventListener('click', function () {
        imageUrls.pop(); // Reduce the size of imageUrls by removing the last image URL
        recreateGame(); // Update the game by reshuffling the images and recreating the game boxes
    });

    // Recreate the game with updated image URLs
    function recreateGame() {
        document.querySelector('.game').innerHTML = ''; // Clear the current game
        createGame(); // Reinitialize the game with the updated imageUrls
    }
});
