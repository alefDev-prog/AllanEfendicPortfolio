// Selectors

const accordionBtns = document.getElementsByClassName('accordion-title');

// Event listeners
for(btn of accordionBtns) {

    btn.addEventListener('click', (event) => {
        const sibling = event.target.nextElementSibling;
        event.target.classList.toggle('minus');
        sibling.classList.toggle('active');
    
    })
}
// Functions

