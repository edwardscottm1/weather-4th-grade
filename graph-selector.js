'use script';


function main() {
    document.querySelector('#hour-temp').addEventListener('click', addSelectorBehavior);
    document.querySelector('#hour-precip').addEventListener('click', addSelectorBehavior);
    document.querySelector('#hour-wind').addEventListener('click', addSelectorBehavior);
}

// Function to add scrolling behavior for selecting graphs
function addSelectorBehavior(evnt) {
    // Each button has a index
    let index = Number(evnt.target.dataset.index);
    const container = document.querySelector('#hours');
    const graphHeight = container.clientHeight;

    // To Scroll to the graph, we use the srollTo method and multiply the index by the graph height
    container.scrollTo({
    top: graphHeight * index,
    behavior: 'smooth'})
    
}

main();