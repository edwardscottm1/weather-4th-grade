"use strict";

// Function used to create x number of elements that will continuously fall down the page
function createRandomFallingElements(images, count, maxAnimationDelay, animationDuration, imageSize = 0) {

    // Save each element into an array
    let elements = [];
    for (let i = 0; i <= count; i++) {
        // Create an element
        let element = document.createElement('img');
        // Give it a random left and animationDelay value and set a duration
        element.style.left = `${Math.random() * 92}%`;
        element.style.animationDelay = `${Math.random() * maxAnimationDelay}s`;
        element.style.animationDuration = `${animationDuration}s`; 
        // Give element random rotation
        element.style.rotate = `${Math.random() * 360}deg`;


        // Give element appropriate class
        element.classList.add("falling-element");

        // Change size if we pass a value
        if (imageSize != 0 ) {
            element.style.width = `${imageSize}px`;
            element.style.height = "auto";
        }

        // Give the element a random image
        element.setAttribute("src", images[Math.floor(Math.random() * images.length)])
    
        elements.push(element);

        // MOve element to a random x pos abd rotation
        element.addEventListener("animationiteration", function (evnt){ 
            evnt.target.style.left = `${Math.random() * 110}%`;
            element.style.rotate = `${Math.random() * 360} deg`;
        });
    
    }
    // Append all the elements to the page
    document.body.append(...elements);

}

const images = ["./images/fallingImages/leaf1.svg", "./images/fallingImages/leaf2.svg", "./images/fallingImages/leaf3.svg"]
createRandomFallingElements(images, 20, 8, 8, 40);