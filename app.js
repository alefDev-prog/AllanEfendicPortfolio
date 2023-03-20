// information accordion
const accordionBtns = document.getElementsByClassName('accordion-title');
for(btn of accordionBtns) {

    btn.addEventListener('click', (event) => {
        const sibling = event.target.nextElementSibling;
        event.target.classList.toggle('minus');
        sibling.classList.toggle('active');
    })
}
// Functions



// sliding in the hidden elements

const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            console.log(entry);
            entry.target.classList.add("show");
        }
        else {
            entry.target.classList.remove("show");
        }
    });
});

hiddenElements.forEach((element) => observer.observe(element));




// 3d animations for icons 

const icons = document.querySelectorAll(".icon-container");

icons.forEach(icon => {
    icon.addEventListener('mousemove', event => {
       
           
        let X = (event.offsetX-icon.clientWidth/2)/2;
        let Y = (event.offsetY-icon.clientHeight/2)/2;
        console.log(`X: ${X}`);
        console.log(`Y: ${Y}`);
        event.target.style.transform = `rotateY(${X}deg) rotateX(${Y}deg)`;
        event.stopPropagation();
    
    },);
});





