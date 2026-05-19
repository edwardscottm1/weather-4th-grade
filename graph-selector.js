'use script';


function main() {
    document.querySelector('#hour-temp').addEventListener('click', addSelectorBehavior);
    document.querySelector('#hour-precip').addEventListener('click', addSelectorBehavior);
    document.querySelector('#hour-wind').addEventListener('click', addSelectorBehavior);
}

function addSelectorBehavior(evnt) {
    let index = Number(evnt.target.dataset.index);
    const container = document.querySelector('#hours');
    const graphHeight = container.clientHeight;

    container.scrollTo({
    top: graphHeight * index,
    behavior: 'smooth'})
    
}

main()