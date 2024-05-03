// Arrow Key Navigation 
// https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
// https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript

document.addEventListener('DOMContentLoaded', function () {
    // Select all the <a> and <button> elements
    var elements = document.querySelectorAll('a, button');
    
    // Initialize the current focus index
    var currentFocus = 0;

    // Event listener for keydown event
    document.addEventListener('keydown', function (event) {
        // Check if the pressed key is ArrowRight or ArrowLeft
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {

            // Increment or decrement the currentFocus based on the pressed key
            currentFocus += event.key === 'ArrowRight' ? 1 : -1;

            // If currentFocus exceeds the number of elements, set it to 0
            currentFocus = (currentFocus + elements.length) % elements.length;

            // Focus on the element at the currentFocus index
            elements[currentFocus].focus();
        }
    });
});