// Get DOM elements
let btns = document.getElementById("btns");
let character = document.getElementById("character");
let block = document.getElementById("block");
let counter = 0;

// Function to make the character jump
function jump() {
    // Prevent multiple jumps while already jumping
    if (character.classList == "animatech") {
        return;
    }
    // Add animation class to character
    character.classList.add("animatech");
    // Remove animation class after a delay
    setTimeout(function () {
        character.classList.remove("animatech");
    }, 300);
}

// Start the game
function sta() {
    // Collision and update score
    function check() {
        let characterTop = parseInt(
            window.getComputedStyle(character).getPropertyValue("top")
        );
        let blockLeft = parseInt(
            window.getComputedStyle(block).getPropertyValue("left")
        );
        // Check for collision
        if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
            // If collision, call dead function
            dead();
        } else {
            // If no collision, continue the game
            next();
        }
    }

    // Player death
    function dead() {
        // Display buttons
        btns.style.display = "block";
        // Remove animation class from block
        block.classList.remove("animateb");
        // Stop the game loop
        clearInterval(core);
        console.log("dead");

        // Update best score if current score is higher
        let sb = document.getElementById("scorebest");
        if (sb.innerHTML < Math.floor(counter / 100)) {
            sb.innerHTML = Math.floor(counter / 100);
        }
        // Reset counter
        counter = 0;
    }

    // Update score
    function next() {
        counter++;
        // Update score display
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
    }

    // Check if block is already animating
    if (block.classList == "animateb") {
        return;
    }
    // Add animation class to block
    block.classList.add("animateb");
    // Start game loop
    let core = setInterval(check, 10);
}