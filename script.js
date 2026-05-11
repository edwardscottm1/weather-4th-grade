// Edward Scott 5/6/26 - Yellowstone Adventure
/*
This is a simple choose your own adventure game that takes places in Yellowstone National Park.
Before the player can play, they must enter some information about themselves to personalize the story.
    They will only enter information once
Afterwards the player will be shown an image, text and buttons. These buttons are actions the user can 
take in the game. The player will keep choosing options till they reach an ending. After reaching an ending,
the player can play again to reach the other 12 endings. They can view the endings they have reached by pressing 
the "endings" button on the menu. Once the 12 endings have been reached, a secret ending will appear on the menu.
*/

'use strict';


// Main function 
function main() {
    document.querySelector('#search-location').addEventListener('submit', function (evnt) {
        evnt.preventDefault();
    })
    
}


// Main function call
main();